
const { existsSync } = require('fs')
const { resolve } = require('path')
const userStorePath = resolve(__dirname, 'store.js')
let userStore
if (existsSync(userStorePath)) {
  userStore = require(userStorePath)
} else {
  userStore = require('./file-store')
}

module.exports = userStore
