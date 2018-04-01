
const request = require('supertest')

const app = require('../..')
const server = app.listen()

afterAll(() => server.close())

test('GET /assets/babel-polyfill/polyfill.min.js', async () => {
  await request(server)
    .get('/assets/babel-polyfill/polyfill.min.js')
    .expect(200)
    .expect('Content-Type', /application\/javascript/)
})

test('GET /assets/rollbar/rollbar.min.js', async () => {
  await request(server)
    .get('/assets/rollbar/rollbar.min.js')
    .expect(200)
    .expect('Content-Type', /application\/javascript/)
})
