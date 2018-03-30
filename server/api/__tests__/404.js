
const request = require('supertest')
const assert = require('assert')

const app = require('../..')
const server = app.listen()

afterAll(() => server.close())

test('GET /api/klajsdflkjaslkdfjklasdjf', async () => {
  const { body } = await request(server)
    .get('/api/lakjsdflkajsldkfjasf')
    .expect(404)

  assert.equal('object', typeof body)
  assert.equal('Not Found', body.message)
})
