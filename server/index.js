const compose = require('koa-compose')
// const mount = require('koa-mount')

const app = module.exports = require('./app')

app.use(compose(require('./routes')))
app.use(ctx => ctx.throw(404))

if (!module.parent) {
  const port = process.env.PORT || 3690

  app.listen(port, function (err) {
    if (err) {
      console.error(err.stack)
      process.exit(1)
    }

    console.log('IMS serving at http://localhost:%s', this.address().port)
  })
}
