/* eslint-disable prettier/prettier */
import dotenv from 'dotenv'

dotenv.config()

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_URI_TEST: process.env.MONGODB_URI_TEST,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  JWT_TOKEN_TIME: process.env.JWT_TOKEN_TIME,
  PARSER_SECRET: process.env.PARSER_SECRET,
  STATIC_FOLDER: process.env.STATIC_FOLDER,
}

export default config
