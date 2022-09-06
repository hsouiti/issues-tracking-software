import http from 'http'
import app from './app'
// config file
import config from '../config/index'

// Db connect
import connectDB from './db/index'

const MONGODB_URL = 'mongodb+srv://hassan:tMdJoKWscAJTWhaY@cluster0.rbywy.mongodb.net/bugs'
app.set('PORT', config.PORT)
const server = http.createServer(app)

void (async () => {
  try {
    await connectDB(MONGODB_URL)
    server.listen(
      app.get('PORT')
      /*  console.log(`Server running at http://localhost:${app.get('PORT')}`) */
    )
  } catch (error: unknown) {
    const err = error as { message: string }
    console.log('Failed to connect to DB', err.message)
    server.close()
    // process.exit(1)
  }
})()
