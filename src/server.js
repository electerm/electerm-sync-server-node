const app = require('./app')

const {
  PORT,
  HOST
} = process.env
app.listen(PORT, HOST, () => {
  console.log('server running at', `http://${HOST}:${PORT}`)
})
