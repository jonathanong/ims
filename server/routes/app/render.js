
const path = require('path')
const pug = require('pug')
const fs = require('fs')

const TEMPLATE_FILENAME = path.resolve(__dirname, 'index.pug')
const MANIFEST_PATH = '../../../dist/manifest.json'
const env = process.env.NODE_ENV || 'development'
const devServer = !!process.env.WEBPACK_DEV_SERVER

let manifest
const getManifest = () => {
  // no manifest for dev builds
  if (devServer) {
    return new Proxy({}, {
      get (obj, prop) {
        if (typeof prop === 'string') return `/assets/${prop}`
        return obj[prop]
      }
    })
  }
  // get the manifest with no caching
  if (env === 'development') return JSON.parse(fs.readFileSync(require.resolve(MANIFEST_PATH), 'utf8'))
  // return the manifest
  manifest = require(MANIFEST_PATH)
  return manifest
}

const rollbarConfig = {
  accessToken: '',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: true,
  payload: {
    environment: env
  }
}

module.exports = (ctx) => {
  const hostname = ctx.request.get('x-forwarded-host') || ctx.hostname
  return pug.renderFile(TEMPLATE_FILENAME, {
    cache: env === 'production',
    env,
    devServer,
    manifest: manifest || getManifest(),
    hostname,
    rollbarConfig
  })
}
