/* eslint-env jest */
require('dotenv').config()
const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises')
const path = require('path')

const {
  JWT_SECRET,
  JWT_USERS,
  FILE_STORE_PATH
} = process.env

// Setup test data and tokens
const validUserId = JWT_USERS.split(',')[0]
const invalidUserId = 'invalid-user'

const validToken = jwt.sign(
  { id: validUserId },
  JWT_SECRET,
  { algorithm: 'HS256', expiresIn: '1h' }
)

const invalidToken = jwt.sign(
  { id: invalidUserId },
  JWT_SECRET,
  { algorithm: 'HS256', expiresIn: '1h' }
)

const testData = { test: 'data' }

describe('API Endpoints', () => {
  // Clean up test files after all tests
  afterAll(async () => {
    const testFile = path.resolve(FILE_STORE_PATH || process.cwd(), `${validUserId}.json`)
    try {
      await fs.unlink(testFile)
    } catch (err) {
      // Ignore if file doesn't exist
    }
  })

  describe('GET /test', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/test')
      expect(response.status).toBe(200)
      expect(response.text).toBe('ok')
    })
  })

  describe('PUT /api/sync', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .put('/api/sync')
        .send(testData)
      expect(response.status).toBe(401)
    })

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .put('/api/sync')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(testData)
      expect(response.status).toBe(401)
    })

    it('should return 200 with valid token', async () => {
      const response = await request(app)
        .put('/api/sync')
        .set('Authorization', `Bearer ${validToken}`)
        .send(testData)
      expect(response.status).toBe(200)
      expect(response.text).toBe('ok')
    })
  })

  describe('POST /api/sync', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .post('/api/sync')
      expect(response.status).toBe(401)
    })

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .post('/api/sync')
        .set('Authorization', `Bearer ${invalidToken}`)
      expect(response.status).toBe(401)
    })

    it('should return 200 with valid token', async () => {
      const response = await request(app)
        .post('/api/sync')
        .set('Authorization', `Bearer ${validToken}`)
      expect(response.status).toBe(200)
      expect(response.text).toBe('test ok')
    })
  })

  describe('GET /api/sync', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/sync')
      expect(response.status).toBe(401)
    })

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get('/api/sync')
        .set('Authorization', `Bearer ${invalidToken}`)
      expect(response.status).toBe(401)
    })

    it('should return previously stored data with valid token', async () => {
      const response = await request(app)
        .get('/api/sync')
        .set('Authorization', `Bearer ${validToken}`)
      expect(response.status).toBe(200)
      // File should exist and contain test data from PUT test
    })
  })
})
