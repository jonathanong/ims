
const uniq = require('lodash/uniq')

const sanitize = require('../../utils/sanitize').tag
const db = require('../../psql')

exports.upsertImageTags = async (imageId, tagNames) => {
  const names = uniq(tagNames.map(sanitize))

  const { rows } = await db.query(`
    WITH with_tags AS (
      INSERT INTO tags (name)
      VALUES ${Array.from({ length: names.length }, (x, i) => `($${i + 2})`).join(',')}
      ON CONFLICT (name)
      DO UPDATE SET name = EXCLUDED.name
      RETURNING *
    )

    INSERT INTO images_to_tags (image_id, tag_id)
    SELECT
      $1 AS image_id,
      with_tags.id AS tag_id
    FROM with_tags
    ON CONFLICT (image_id, tag_id)
    DO UPDATE SET image_id = EXCLUDED.image_id
    RETURNING *
  `, [imageId].concat(names))

  return rows
}

exports.getTagsWithCounts = () => db.query(`
  SELECT
    tags.id AS id,
    tags.name AS name,
    COUNT(*) AS images
  FROM tags
  JOIN images_to_tags ON images_to_tags.tag_id = tags.id
  GROUP BY 1
  ORDER BY 3 DESC
`).then(x => x.rows)

exports.deleteImageTags = async (imageId, tagIds) => {
  const ids = tagIds.map(x => ~~x).filter(x => x > 0)
  if (!ids.length) return

  await db.query(`
    DELETE FROM images_to_tags
    WHERE image_id = $1
      AND tag_id IN (${Array.from({ length: ids.length }, (x, i) => `$${i + 2}`).join(',')})
  `, [imageId].concat(ids))
}
