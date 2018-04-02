
const route = require('koa-path-match')()

const { upload } = require('../../controllers/images')
const {
  getImages,
  getImageById
} = require('../../models/images/crud')

const routes = module.exports = []

routes.push(route('/images')
  .get(async (ctx) => {
    ctx.body = await getImages(ctx.query)
  })
  .post(async (ctx) => {
    ctx.body = await upload(ctx)
  }))

routes.push(route('/images/:id')
  .get(async (ctx) => {
    ctx.body = await getImageById(ctx.params.id)
  }))
