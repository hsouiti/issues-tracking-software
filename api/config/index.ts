/* eslint-disable prettier/prettier */
import dotenv from 'dotenv'

dotenv.config()

/* interface configTypes {
  ENV: string;
  PORT: number;
  MONGO_URL: string;
  JWT_TOKEN_SECRET: string;
  JWT_TOKEN_TIME: string;
  PARSER_SECRET: string;
  STATIC_FOLDER: string;
} */

const config = {
  ENV: (process.env.NODE_ENV != null) || 'development',
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGODB_URL,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  JWT_TOKEN_TIME: process.env.JWT_TOKEN_TIME,
  PARSER_SECRET: process.env.PARSER_SECRET,
  STATIC_FOLDER: process.env.STATIC_FOLDER,
}

export default config
