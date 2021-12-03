import http from 'http'
import app from './app.js'

// config file
import config from './config/index.js'

// Db connect
import connectDB from './db/index.js'

app.set('PORT', config.PORT)
const server = http.createServer(app)

;(async () => {
  try {
    await connectDB(config.MONGO_URL)
    server.listen(
      app.get('PORT'),
      console.log(`Server running at http://localhost:${app.get('PORT')}`)
    )
  } catch (error) {
    server.close(() => console.log('Failed to connect to DB', error.message))
    process.exit1()
  }
})()
