
exports.randomString = () => Math.random().toString(36).slice(2)

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
