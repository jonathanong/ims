
const compose = require('koa-compose')
const serve = require('koa-static')
const mount = require('koa-mount')
const path = require('path')
const Koa = require('koa')

const onError = require('../lib/on-error')

const app = module.exports = new Koa()
const env = process.env.NODE_ENV || 'development'

require('koa-body-parsers')(app)

app.on('error', (err, ctx) => {
  const { status } = err
  if (typeof status === 'number' && status >= 100 && status < 500) return
  if (status === 501) return // Not Implemented => we know we didn't implement something

  // Ignore errors about connections being interrupted
  switch (err.code) {
    case 'EPIPE':
    case 'ECONNRESET':
      return
  }

  onError(err, ctx)
})

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

// public assets
app.use(serve(path.resolve('public'), {
  maxage: 86400 * 1000,
  hidden: true,
  index: false
}))

// wepback-built files
app.use(mount('/assets', compose([
  serve(path.resolve('dist'), {
    maxage: 86400 * 1000,
    hidden: false,
    index: false
  }),
  pageNotFound
])))

// storybook - I wouldn't serve this in production
app.use(mount('/storybook', compose([
  serve(path.resolve('storybook-static'), {
    maxage: 86400 * 1000
  }),
  pageNotFound
])))

function pageNotFound (ctx) {
  ctx.throw(404)
}
