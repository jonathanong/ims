
const request = require('supertest')

const app = require('../..')
const server = app.listen()

afterAll(() => server.close())

test('GET /ping', async () => {
  await request(server)
    .get('/ping')
    .expect(200)
    .expect('pong')
})
