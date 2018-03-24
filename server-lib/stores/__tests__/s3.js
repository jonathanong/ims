
const assert = require('assert')

const { upload } = require('../s3')
const {
  randomString
} = require('../../utils')

test('upload(filename, key, metadata)', async () => {
  const data = await upload(__filename, 'test/' + randomString() + '.js', {
    format: 'js'
  })
  assert(data)
})
