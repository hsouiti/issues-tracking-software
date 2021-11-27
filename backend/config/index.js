import dotenv from 'dotenv'

dotenv.config()

const config = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3500,
  MONGO_URL: process.env.MONGODB_URL,
}

export default config