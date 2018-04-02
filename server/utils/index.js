
const tempPath = require('temp-path')
const cp = require('fs-cp')

// download a stream to the local file system
exports.download = stream => cp(stream, tempPath())

exports.getLimitAndOffset = (options = {}) => {
  let limit = ~~options.limit || 25
  limit = Math.max(limit, 1)
  limit = Math.min(limit, 100)

  let offset = ~~options.offset
  offset = Math.max(offset, 0)

  return {
    limit,
    offset
  }
}
