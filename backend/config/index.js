import dotenv from 'dotenv'

dotenv.config()

const config = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3500,
  MONGO_URL: process.env.MONGODB_URL,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  JWT_TOKEN_TIME: process.env.JWT_TOKEN_TIME,
  PARSER_SECRET: process.env.PARSER_SECRET,
};

export default config
