#!/usr/bin/env node

const app = require('../server')

const port = process.env.PORT || 3690

app.listen(port, function (err) {
  if (err) {
    console.error(err.stack)
    process.exit(1)
  }

  console.log('IMS serving at http://localhost:%s', this.address().port)
})
