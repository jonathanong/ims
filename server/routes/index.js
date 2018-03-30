
const route = require('koa-path-match')()

const routes = module.exports = []

// health check
routes.push(route('/ping').get(ctx => {
  ctx.body = 'pong'
}))

routes.push(...require('./client-app'))
