
const Rollbar = require('rollbar')

module.exports = new Rollbar({
  accessToken: '',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV || 'development'
  }
})
