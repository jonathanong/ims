
const route = require('koa-path-match')()

const render = require('./render')

const routes = module.exports = []

const serve = () => async (ctx) => {
  ctx.body = render(ctx)
}

routes.push(route('/').get(serve()))
routes.push(route('/images/:id').get(serve()))
