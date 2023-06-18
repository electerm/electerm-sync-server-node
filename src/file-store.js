/**
 * use file as data store
 */

const { writeFile } = require('fs/promises')
const { resolve } = require('path')
const cwd = process.cwd()
const folder = process.env.FILE_STORE_PATH || cwd

async function write (req, res) {
  const {
    body,
    auth: {
      id
    }
  } = req
  const str = JSON.stringify(body || {})
  const path = resolve(folder, `${id}.json`)
  await writeFile(path, str)
  res.send('ok')
}

async function read (req, res) {
  const {
    auth: {
      id
    }
  } = req
  const path = resolve(folder, `${id}.json`)
  res.sendFile(path)
}

module.exports = {
  read,
  write
}
