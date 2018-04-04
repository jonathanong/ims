const compose = require('koa-compose')
const mount = require('koa-mount')

const app = module.exports = require('./app')

if (process.env.NODE_ENV !== 'production') app.use(mount('/api', compose(require('./api'))))
app.use(compose(require('./routes')))
app.use(ctx => ctx.throw(404))
