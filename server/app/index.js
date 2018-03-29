
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

app.use(require('koa-json')({
  pretty: env !== 'production'
}))
