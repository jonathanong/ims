
const request = require('request')
const assert = require('assert')

const identify = require('..')
const {
  download
} = require('../../utils')

const TEST_IMAGE = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'

let filename
let metadata

test('download()', async () => {
  filename = await download(request(TEST_IMAGE))
  assert(filename)
})

test('(filename)', async () => {
  metadata = await identify(filename)
  assert.equal('string', typeof metadata.format)
  assert.equal('number', typeof metadata.width)
  assert.equal('number', typeof metadata.height)
  assert(Array.isArray(metadata.channel_stats))
  assert.equal('boolean', typeof metadata.is_opaque)

  assert(!metadata.is_opaque)
})
