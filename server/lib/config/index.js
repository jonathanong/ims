
const assert = require('assert')

exports.s3Prefix = process.env.IMS_PREFIX || ''

exports.s3 = {
  accessKeyId: process.env.IMS_ACCESS_KEY_ID || process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.IMS_SECRET_ACCESS_KEY || process.env.SECRET_ACCESS_KEY,
  maxRetries: 3,
  params: {
    Bucket: process.env.IMS_S3_BUCKET || process.env.S3_BUCKET,
    CacheControl: process.env.IMS_CACHE_CONTROL || 'public, max-age=31536000'
  }
}

exports.imgix = {
  subdomain: process.env.IMS_IMGIX_SUBDOMAIN || process.env.IMGIX_SUBDOMAIN,
  apiKey: process.env.IMS_IMGIX_API_KEY || process.env.IMGIX_API_KEY
}

assert(exports.s3.accessKeyId)
assert(exports.s3.secretAccessKey)
assert(exports.s3.params.Bucket)

assert(exports.imgix.subdomain)

// as supported by sharp
exports.formats = [
  'jpeg',
  'png',
  'svg',
  'gif',
  'webp'
]
