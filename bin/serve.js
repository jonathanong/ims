#!/usr/bin/env node

const stoppable = require('stoppable')
const http = require('http')

const onError = require('../server/lib/on-error')
const app = require('../server')

const gracefulShutdownPeriodSeconds = 10
const port = process.env.PORT || 3690
let closing = false

const server = http.createServer(app.callback())
stoppable(server, gracefulShutdownPeriodSeconds * 1000)

server.listen(port, function (err) {
  if (err) {
    console.error(err.stack)
    process.exitCode = 1
    return
  }

  console.log('IMS serving at http://localhost:%s', this.address().port)
})

process.on('unhandledRejection', onError)
process.on('uncaughtException', (err) => {
  console.error(err.stack)
  close()
})

process.on('SIGINT', close)
process.on('SIGTERM', close)

function close () {
  if (closing) return
  closing = true
  server.stop()
}
