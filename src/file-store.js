/**
 * use SQLite as data store
 */

const Database = require('better-sqlite3')
const { resolve } = require('path')
const cwd = process.cwd()
const dbPath = process.env.DB_PATH || resolve(cwd, 'electerm-sync.db')
const db = new Database(dbPath)

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS user_data (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL
  )
`)

const insertStmt = db.prepare('INSERT OR REPLACE INTO user_data (id, data) VALUES (?, ?)')
const selectStmt = db.prepare('SELECT data FROM user_data WHERE id = ?')

async function write (req, res) {
  const {
    body,
    auth: {
      id
    }
  } = req
  const str = JSON.stringify(body || {})
  insertStmt.run(id, str)
  console.log('💾 Data written for user:', id, '- Size:', str.length, 'bytes')
  res.send('ok')
}

async function read (req, res) {
  const {
    auth: {
      id
    }
  } = req
  const row = selectStmt.get(id)
  if (row) {
    console.log('📖 Data read for user:', id, '- Size:', row.data.length, 'bytes')
    res.json(JSON.parse(row.data))
  } else {
    console.log('📖 No data found for user:', id, '- Returning empty object')
    res.json({})
  }
}

module.exports = {
  read,
  write
}
