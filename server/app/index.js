
const compose = require('koa-compose')
const serve = require('koa-static')
const mount = require('koa-mount')
const path = require('path')
const Koa = require('koa')

const app = module.exports = new Koa()
const env = process.env.NODE_ENV || 'development'

require('koa-body-parsers')(app)

app.use(require('koa-response-time')())

if (env === 'development') app.use(require('concurrency-logger').default())

app.use(require('koa-compress')({
  flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(require('koa-conditional-get')())
app.use(require('koa-etag')())

app.use(require('koa-favicon')(path.resolve(__dirname, '../../public/favicon.ico')))

app.use(require('koa-json')({
  pretty: env !== 'production'
}))

// serve the static files
app.use(serve(path.resolve('public'), {
  maxage: 86400 * 1000,
  hidden: true,
  index: false
}))

// serve the built files on /_assets/
app.use(mount('/assets', compose([
  serve(path.resolve('dist'), {
    maxage: 86400 * 1000,
    hidden: false,
    index: false
  }),
  (ctx) => ctx.throw(404)
])))
