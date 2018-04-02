
const assert = require('assert')

const { randomString } = require('../../../../isomorphic/utils')
const { upload } = require('../s3')

test('upload(filename, key, metadata)', async () => {
  const data = await upload(__filename, 'test/' + randomString() + '.js', {
    format: 'js'
  })
  assert(data)
})
