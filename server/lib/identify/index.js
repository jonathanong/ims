
const error = require('http-errors')
const sharp = require('sharp')

module.exports = async filename => {
  const metadata = await sharp(filename).metadata().catch((err) => {
    throw error(415, `Could not read the image file metadata: ${err.message}`)
  })

  const stats = await sharp(filename).stats().catch((err) => {
    throw error(415, `Could not read the image file stats: ${err.message}`)
  })

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
