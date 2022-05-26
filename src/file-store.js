/**
 * use file as data store
 */

const { writeFile } = require('fs/promises')
const { resolve } = require('path')
const cwd = process.cwd()
const defaultDataFilePath = resolve(cwd, 'electerm-sync.json')

async function write (req, res) {
  const {
    body
  } = req
  const str = JSON.stringify(body || {})
  await writeFile(defaultDataFilePath, str)
  res.send('ok')
}

async function read (req, res) {
  console.log('read')
  res.sendFile(defaultDataFilePath)
}

module.exports = {
  read,
  write
}
