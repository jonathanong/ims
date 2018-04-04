#!/usr/bin/env node

const debug = require('debug')('ims:bin:serve')
const stoppable = require('stoppable')
const http = require('http')

const onError = require('../server/lib/on-error')
const app = require('../server')

const gracefulShutdownPeriodSeconds = ~~process.env.GRACEFUL_SHUTDOWN_PERIOD_SECONDS || 10
const port = process.env.PORT || 3690
let closing = false

debug('graceful shutdown period in seconds: %d', gracefulShutdownPeriodSeconds)

const server = http.createServer(app.callback())
stoppable(server, gracefulShutdownPeriodSeconds * 1000)

server.listen(port, function (err) {
  if (err) {
    debug('server errored')
    console.error(err.stack)
    process.exitCode = 1
    return
  }

  debug('server listening')
  console.log('IMS serving at http://localhost:%s', this.address().port)
})

// we just log unhandled rejection errors because they don't ruin the process
process.on('unhandledRejection', onError)
// uncaught exceptions can mess up your code, so restart the server gracefully
process.on('uncaughtException', (err) => {
  debug('uncaught exception')
  console.error(err.stack)
  close()
})

process.on('SIGINT', close)
process.on('SIGTERM', close)

function close () {
  debug('server closing')
  if (closing) return
  closing = true
  server.stop() // from `stoppable`
}
