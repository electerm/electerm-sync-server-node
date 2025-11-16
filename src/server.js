const app = require('./app')

const {
  PORT = 7837,
  HOST = '127.0.0.1',
  JWT_SECRET,
  JWT_USERS,
  DB_PATH,
  FILE_STORE_PATH
} = process.env

console.log('🚀 Starting Electerm Sync Server...')
console.log(`📍 Server will run at: http://${HOST}:${PORT}`)
console.log(`🔐 JWT Secret: ${JWT_SECRET ? '✓ Configured' : '✗ Missing - set JWT_SECRET in .env'}`)
console.log(`👥 JWT Users: ${JWT_USERS ? JWT_USERS.split(',').length + ' users configured' : '✗ Missing - set JWT_USERS in .env'}`)
console.log(`💾 Storage: ${DB_PATH ? 'SQLite (' + DB_PATH + ')' : FILE_STORE_PATH ? 'File (' + FILE_STORE_PATH + ')' : 'SQLite (data.db)'}`)
console.log('')
console.log('📖 Usage Instructions:')
console.log('1. In Electerm, go to Settings > Sync')
console.log('2. Set Custom Sync Server:')
console.log(`   - Server URL: http://${HOST}:${PORT}/api/sync`)
console.log('   - JWT Secret: (copy from your .env file)')
console.log('   - User Name: (one of the JWT_USERS from your .env file)')
console.log('')
console.log('🧪 Test endpoint: http://' + HOST + ':' + PORT + '/test')
console.log('')

app.listen(PORT, HOST, () => {
  console.log('✅ Server is now running and ready to accept connections!')
  console.log('🌐 API endpoints:')
  console.log('   GET  /api/sync - Read sync data')
  console.log('   PUT  /api/sync - Write sync data')
  console.log('   POST /api/sync - Test connection')
  console.log('   GET  /test     - Health check')
})
