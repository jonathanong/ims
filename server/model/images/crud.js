
const assert = require('assert')

const { getLimitAndOffset } = require('../../utils')
const sanitize = require('../../utils/sanitize')
const { formats } = require('../../lib/config')
const db = require('../../psql')

exports.createImage = async (key, metadata) => {
  const { rows } = await db.query(`
    INSERT INTO images (
      key,
      pathname,
      title,
      format,
      width,
      height,
      space,
      channels,
      density,
      has_profile,
      has_alpha,
      orientation,
      is_opaque
    ) VALUES (
      $1,
      $1,
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      $10,
      $11
    ) RETURNING id
  `, [
    key,
    metadata.format,
    metadata.width,
    metadata.height,
    metadata.space,
    metadata.channels,
    metadata.density,
    metadata.has_profile,
    metadata.has_alpha,
    metadata.orientation,
    metadata.is_opaque
  ])

  const { id } = rows[0]

  await db.query(`
    INSERT INTO image_pathname_history (
      image_id,
      pathname
    ) VALUES (
      $1,
      $2
    )
  `, [id, key])

  return exports.getImageById(id)
}

exports.getImageById = async (id) => {
  const { rows } = await db.query(`
    SELECT *
    FROM view_images
    WHERE id = $1
  `, [id])

  return rows[0] || null
}

const getImageByPathQuery = (notDeleted) => `
  SELECT image_id
  FROM image_pathname_history
  JOIN images ON image_pathname_history.image_id = images.id
  WHERE image_pathname_history.pathname = $1 ${notDeleted ? 'AND images.deleted = FALSE' : ''}
  ORDER BY image_pathname_history.created_ts DESC
  LIMIT 1
`
exports.getImageByPath = async (pathname) => {
  { // search only not-deleted images
    const { rows } = await db.query(getImageByPathQuery(true), [pathname])
    if (rows.length) return exports.getImageById(rows[0].image_id)
  }

  { // search deleted images
    const { rows } = await db.query(getImageByPathQuery(false), [pathname])
    if (rows.length) return exports.getImageById(rows[0].image_id)
  }

  return null
}

const filterTags = (tags, values, excluded) => tags.split(',').map(x => x.trim()).filter(Boolean)
  .map((x) => {
    const length = values.push(x)
    const nameFilter = `${excluded ? 'NOT' : ''} EXISTS (
      SELECT 1
      FROM images_to_tags
      JOIN tags ON images_to_tags.tag_id = tags.id
      WHERE images_to_tags.image_id = images.id
        AND tags.name = $${length}
      LIMIT 1
    )`

    const idFilter = `${excluded ? 'NOT' : ''} EXISTS (
      SELECT 1
      FROM images_to_tags
      WHERE tag_id = $${length}
    )`

    if (isNaN(x)) return nameFilter

    return `(${nameFilter} OR ${idFilter})`
  })

exports.getImages = async (options = {}) => {
  const { limit, offset } = getLimitAndOffset(options)
  const filters = ['images.deleted = FALSE']
  const values = [limit, offset]

  if (options.formats) {
    const x = options.formats.toLowerCase().split(',').map(x => x.trim())
    assert(x.length, 'Null list of image formats.')
    x.forEach(y => assert(formats.includes(y), `Invalid image format: ${y}`))
    filters.push(`images.format IN (${x.map(y => `'${y}'`).join(',')})`)
  }

  if (options.tags) {
    filters.push(...filterTags(options.tags, values, false))
  }

  if (options.ex_tags) {
    filters.push(...filterTags(options.ex_tags, values, true))
  }

  const result = await db.query(`
    WITH image_ids AS (
      SELECT id
      FROM images
      WHERE ${filters.join('\nAND\n')}
      ORDER BY ${getOrderBy(options.sort)}
      LIMIT $1
      OFFSET $2
    )

    SELECT view_images.*
    FROM view_images
    JOIN image_ids ON image_ids.id = view_images.id
  `, values)

  return result.rows
}

exports.editImage = async (id, changes = {}) => {
  for (const key of Object.keys(changes)) {
    switch (key) {
      case 'title':
      case 'description':
        await db.query(`
          UPDATE images
          SET ${key} = $2
          WHERE id = $1
        `, [
          id,
          sanitize[key](changes[key])
        ])
        break
      case 'pathname':
        const pathname = sanitize.pathname(changes[key])
        await db.query(`
          UPDATE images
          SET ${key} = $2
          WHERE id = $1
        `, [id, pathname])
        await db.query(`
          INSERT INTO image_pathname_history (
            image_id,
            pathname
          ) VALUES (
            $1,
            $2
          )
        `, [id, pathname])
        break
    }
  }
}

exports.deleteImage = async (id) => db.query(`
  UPDATE images
  SET deleted = TRUE,
    deleted_ts = CURRENT_TIMESTAMP
  WHERE id = $1
`, [id])

function getOrderBy (name) {
  switch (name) {
    case 'oldest': return 'images.created_ts ASC'
    case 'newest': return 'images.created_ts DESC'
    case 'updated': return 'images.created_ts DESC'
    case 'pathname_asc': return 'images.pathname ASC'
    case 'pathname_desc': return 'images.pathname DESC'
    default: return 'images.created_ts DESC'
  }
}
