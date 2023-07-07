const express = require('express')
const { expressjwt: jwt } = require('express-jwt')
require('dotenv').config()

function createApp (config) {
  const app = express()
  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  const jwtAuth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
  })
  const userCheck = function (req, res, next) {
    const { id } = req.auth
    const all = process.env.JWT_USERS.split(',')
    if (all.includes(id)) {
      next()
    } else {
      res.status(401).send('invalid user...')
    }
  }
  const errHandler = function (err, req, res, next) {
    if (err && err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...')
    } else {
      next()
    }
  }
  app.put('/api/sync', jwtAuth, errHandler, userCheck, config.write)
  app.post('/api/sync', jwtAuth, errHandler, userCheck, (req, res) => {
    res.send('test ok')
  })
  app.get('/api/sync', jwtAuth, errHandler, userCheck, config.read)
  app.get('/test', (req, res) => {
    res.send('ok')
  })
  return app
}

const config = require('./store-default')
const app = createApp(config)

module.exports = app
