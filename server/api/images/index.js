
const route = require('koa-path-match')()

const { upload } = require('../../controllers/images')
const {
  getImages,
  getImageById,
  editImage,
  deleteImage
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
    const image = await getImageById(ctx.params.id)
    ctx.assert(image, 404)

    ctx.body = image
  })
  .patch(async (ctx) => {
    const image = await getImageById(ctx.params.id)
    ctx.assert(image, 404)

    ctx.assert(ctx.request.is('json'), 415)
    const body = await ctx.request.json()

    await editImage(image.id, body)

    ctx.body = await getImageById(image.id)
  })
  .delete(async (ctx) => {
    await deleteImage(ctx.params.id)
    ctx.status = 204
  }))
