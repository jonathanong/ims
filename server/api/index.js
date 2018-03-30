
const statuses = require('statuses')

const routes = module.exports = []

routes.push(async (ctx, next) => {
  try {
    await next()
    const { status, body } = ctx
    if (!status || (status === 404 && !body)) ctx.throw(404)
  } catch (err) {
    const status = ctx.status = err.status || err.statusCode || 500
    ctx.body = {
      name: status >= 500 ? 'Internal Server Error' : err.name,
      message: status >= 500 ? statuses(status) : err.message,
      status
    }

    if (err.code) ctx.body = err.code

    ctx.app.emit('error', err, ctx)
  }
})

routes.push(ctx => ctx.throw(404))
