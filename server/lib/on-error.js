
const rollbar = require('./rollbar')

module.exports = (err, ctx) => {
  const status = err.status = err.status || err.statusCode || 500

  // ignore client errors
  if (status >= 400 && status < 500) return

  rollbar.error(err, ctx && ctx.req)

  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack)
  }
}
