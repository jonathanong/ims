
const request = require('supertest')
const assert = require('assert')

const app = require('../../..')

const server = app.listen()

// http://png-pixel.com/
const SAMPLE_IMAGE = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64')

afterAll(() => server.close())

test('POST /api/images', async () => {
  const { body } = await request(server)
    .post('/api/images')
    .set('Content-Type', 'image/png')
    .set('Content-Length', SAMPLE_IMAGE.length)
    .send(SAMPLE_IMAGE)
    .expect(200)

  assert(body)
  assert(body.id)
})
