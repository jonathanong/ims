
const request = require('request')
const assert = require('assert')

const { randomString } = require('../../../../isomorphic/utils')
const identify = require('../../../lib/images-identify')
const { download } = require('../../../utils')
const {
  createImage,
  getImageById,
  getImageByPath,
  getImages,
  editImage,
  deleteImage
} = require('../crud')

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

test('getImages()', async () => {
  const images = await getImages()
  assert(Array.isArray(images))
})

test('createImage(key, metadata)', async () => {
  image = await createImage(key, metadata)
  assert(image)
  assert.equal('png', image.format)
  assert(Array.isArray(image.tags))
})

test('getImageById(id)', async () => {
  const x = await getImageById(image.id)
  assert(x)
})

test('getImageByPath(key)', async () => {
  const x = await getImageByPath(key)
  assert(x)
  assert.equal(x.id, image.id)
})

test('getImages()', async () => {
  const images = await getImages()
  assert(images.some(x => x.id === image.id))
})

test('editImage(id, { title })', async () => {
  const title = randomString()
  await editImage(image.id, {
    title
  })
  image = await getImageById(image.id)
  assert.equal(title, image.title)
})

test('editImage(id, { pathname })', async () => {
  const pathname = createPathname()
  await editImage(image.id, {
    pathname
  })
  image = await getImageById(image.id)
  assert(image)
  assert.equal(pathname, image.pathname)

  image = await getImageByPath(image.pathname)
  assert(image)
  assert.equal(pathname, image.pathname)

  image = await getImageByPath(pathname)
  assert(image)
  assert.equal(pathname, image.pathname)

  image = await getImageByPath(key)
  assert(image)
  assert.equal(pathname, image.pathname)
})

test('deleteImage(id)', async () => deleteImage(image.id))
