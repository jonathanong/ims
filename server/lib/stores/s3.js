
const S3 = require('aws-sdk/clients/s3')
const mime = require('mime-types')
const fs = require('fs')

const config = require('../config')
const s3 = new S3(config.s3)

exports.upload = (filename, Key, metadata) => s3.putObject({
  Key,
  Body: fs.createReadStream(filename),
  ContentType: mime.contentType(metadata.format)
}).promise()
