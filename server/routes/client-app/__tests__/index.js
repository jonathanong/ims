
const request = require('supertest')

const app = require('../../..')
const server = app.listen()

afterAll(() => server.close())

test('GET /', async () => {
  await request(server)
    .get('/')
    .expect(200)
    .expect('Content-Type', /\btext\/html\b/)
})
