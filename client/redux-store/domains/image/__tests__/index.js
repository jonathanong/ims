
import { createStore } from 'redux'
import assert from 'assert'

import reducer from '../reducer'
import { getImage } from '..'

global.fetch = require('jest-fetch-mock')

test('update images', async () => {
  fetch.once(JSON.stringify({
    id: 1
  }))

  const store = createStore(reducer)

  const image = await getImage(store.dispatch)(1)
  assert(image)
  assert.equal(image.id, 1)
})
