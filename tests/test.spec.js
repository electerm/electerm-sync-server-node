/* eslint-env jest */
require('dotenv').config()
const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const {
  JWT_SECRET,
  JWT_USERS
} = process.env

const token = jwt.sign(
  {
    id: JWT_USERS.split(',')[0]
  },
  JWT_SECRET, { algorithm: 'HS256', expiresIn: '120y' }
)
const args = [
  'Authorization', 'Bearer ' + token
]
function req (method, path = '/sync') {
  return request(app)[method](path)
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
}

describe('test', () => {
  test('get/put', async () => {
    const r0 = await request(app)
      .get('/test')
    expect(r0.statusCode).toBe(200)
    const r1 = await req('get')
    expect(r1.statusCode).toBe(404)
    const r2 = await req('put').send({ sss: 1 })
    expect(r2.statusCode).toBe(200)
    const r3 = await request(app).get('/sync').set(...args)
    expect(r3.statusCode).toBe(200)
    expect(r3.body.sss).toBe(1)
  })
})
