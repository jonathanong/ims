
const request = require('request')
const assert = require('assert')

const identify = require('../../../lib/identify')
const {
  createImage,
  getImageById
} = require('../../images/crud')
const {
  download,
  randomString
} = require('../../../utils')
const {
  getTagsWithCounts,
  upsertTags
} = require('..')

const TEST_IMAGE = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
const createPathname = () => `test/${randomString()}.png`
const key = createPathname()
let filename
let metadata
let image

test('download()', async () => {
  filename = await download(request(TEST_IMAGE))
  assert(filename)
})

test('identify(filename)', async () => {
  metadata = await identify(filename)
  assert.equal('string', typeof metadata.format)
  assert.equal('number', typeof metadata.width)
  assert.equal('number', typeof metadata.height)
  assert(Array.isArray(metadata.channel_stats))
  assert.equal('boolean', typeof metadata.is_opaque)

  assert(!metadata.is_opaque)
})

test('createImage(key, metadata)', async () => {
  image = await createImage(key, metadata)
  assert(image)
  assert.equal('png', image.format)
  assert(Array.isArray(image.tags))
})

test('getTagsWithCounts()', async () => {
  const tags = await getTagsWithCounts()
  assert(Array.isArray(tags))
})

test('upsertTags(imageId, tagNames)', async () => {
  const tags = await upsertTags(image.id, [
    'tag 1',
    'tag 2'
  ])

  assert(Array.isArray(tags))
  assert(tags.length)
})

test('image.tags', async () => {
  image = await getImageById(image.id)

  assert(Array.isArray(image.tags))
  assert(image.tags.some(x => x.name === 'tag 1'))
  assert(image.tags.some(x => x.name === 'tag 2'))
})

test('upsertTags(imageId, tagNames)', async () => {
  const tags = await upsertTags(image.id, [
    'tag 1',
    'tag 2',
    'tag 3',
    'tag 4'
  ])

  assert(Array.isArray(tags))
  assert(tags.length)
})

test('image.tags', async () => {
  image = await getImageById(image.id)

  assert(Array.isArray(image.tags))
  assert(image.tags.some(x => x.name === 'tag 1'))
  assert(image.tags.some(x => x.name === 'tag 2'))
  assert(image.tags.some(x => x.name === 'tag 3'))
  assert(image.tags.some(x => x.name === 'tag 4'))
})
