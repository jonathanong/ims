#!/usr/bin/env node

const onError = require('../server/lib/on-error')
const app = require('../server')

const port = process.env.PORT || 3690
let closing = false

const server = app.listen(port, function (err) {
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

function close () {
  if (closing) return
  closing = true
  server.close()
}
