import http from 'http'
import app from './app'
// config file
import config from '../config/index'

// Db connect
import connectDB from './db/index'

app.set('PORT', config.PORT)
// eslint-disable-next-line prettier/prettier
const server = http.createServer(app);

void (async () => {
  try {
    await connectDB()
    server.listen(app.get('PORT'), () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`Server running at http://localhost:${app.get('PORT')}`)
    })
  } catch (error: unknown) {
    const err = error as { message: string }
    console.log('Failed to connect to DB', err.message)
    server.close()
    process.exit(1)
  }
})()
