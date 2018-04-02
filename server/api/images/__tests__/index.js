
const request = require('supertest')
const assert = require('assert')

const { randomString } = require('../../../utils')
const app = require('../../..')

// http://png-pixel.com/
const SAMPLE_IMAGE = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64')
const server = app.listen()
let image

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
  assert.equal('png', body.format)

  image = body
})

test('GET /api/images', async () => {
  const { body } = await request(server)
    .get('/api/images')
    .expect(200)

  assert(Array.isArray(body))
  assert(body.some(x => x.id === image.id))
})

test('GET /api/images/:id', async () => {
  const { body } = await request(server)
    .get(`/api/images/${image.id}`)
    .expect(200)

  assert.equal(body.id, image.id)
})

test('PATCH /api/images/:id', async () => {
  const changes = {
    title: 'some new title',
    description: 'some new description',
    pathname: 'some-new-pathname-' + randomString()
  }
  const { body } = await request(server)
    .patch(`/api/images/${image.id}`)
    .send(changes)
    .expect(200)

  assert.equal(body.title, changes.title)
  assert.equal(body.description, changes.description)
  assert.equal(body.pathname, changes.pathname)
})

test('DELETE /api/images/:id', async () => {
  await request(server)
    .delete(`/api/images/${image.id}`)
    .expect(204)
})

test('GET /api/images/:id', async () => {
  await request(server)
    .get(`/api/images/${image.id}`)
    .expect(404)
})
