
const assert = require('http-assert')
const error = require('http-errors')
console.log('before require(sharp)')
const sharp = require('sharp')
console.log('after require(sharp)')

const { supported_image_formats } = require('../../../isomorphic/constants.json')

module.exports = async filename => {
  const metadata = await sharp(filename).metadata().catch((err) => {
    throw error(415, `Could not read the image file metadata: ${err.message}`)
  })

  const stats = await sharp(filename).stats().catch((err) => {
    throw error(415, `Could not read the image file stats: ${err.message}`)
  })

  assert(supported_image_formats.includes(metadata.format), 415, `Unsupported image format.`)

  return {
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    space: metadata.space,
    channels: metadata.channels,
    has_profile: metadata.hasProfile,
    has_alpha: metadata.hasAlpha,
    channel_stats: stats.channels,
    is_opaque: stats.isOpaque
  }
}
