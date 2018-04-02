
const route = require('koa-path-match')()

const { upload } = require('../../controllers/images')

const routes = module.exports = []

routes.push(route('/images')
  .post(async (ctx) => {
    ctx.body = await upload(ctx)
  }))
