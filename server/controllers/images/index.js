
const tempPath = require('temp-path')
const crypto = require('crypto')
const cp = require('fs-cp')
const fs = require('fs')

const { createImage } = require('../../models/images/crud')
const identify = require('../../lib/images-identify')
const { upload } = require('../../lib/stores/s3')

const IMAGE_FORMATS = [
  'jpeg',
  'png',
  'svg'
]

/**
 * Upload an image. Returns the image file.
 */

exports.upload = async ctx => {
  ctx.assert(ctx.request.length, 411, 'Content-Length header is required.')
  const format = ctx.request.is(IMAGE_FORMATS)
  ctx.assert(format, 415, 'Only JPEG, PNG, and TIFF images are supported. Alternatively, use multipart.')
  const filename = tempPath() + '.' + format
  try {
    await cp(ctx.req, filename)
    const metadata = await identify(filename)
    const key = crypto.randomBytes(16).toString('base64').replace(/[^a-z0-9]/ig, '').toLowerCase()
    await upload(filename, key, metadata)
    return await createImage(key, metadata)
  } finally {
    fs.unlink(filename, noöp)
  }
}

function noöp () {}
