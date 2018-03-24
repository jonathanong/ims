
const S3 = require('aws-sdk/clients/s3')
const tempPath = require('temp-path')
const error = require('http-errors')
const mime = require('mime-types')
const sharp = require('sharp')
const cp = require('fs-cp')
const fs = require('fs')

const config = require('../config')
const s3 = new S3(config.s3)

// download a stream to the local file system
exports.download = stream => cp(stream, tempPath())

exports.getMetadata = async filename => {
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

exports.upload = (filename, Key, metadata) => s3.putObject({
  Key,
  Body: fs.createReadStream(filename),
  ContentType: mime.contentType(metadata.format)
}).promise()
