import express from 'express';
import path  from 'path'
import cookieParser from 'cookie-parser'

import config from './config/index.js'

import errorsHandler from './middlewares/errorsHandler.js'
import notFound from './middlewares/notFound.js'

import projectsRouter from './routes/projects.js'
import usersRouter from './routes/users.js'
import ticketsRouter from './routes/tickets.js'
import authRouter from './routes/auth.js'

const app = express()
const __dirname = path.resolve()

// middelwaress
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser(config.PARSER_SECRET))
app.use(express.static(path.join(__dirname, config.STATIC_FOLDER)))


// Routes
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tickets', ticketsRouter);

// Errors Handler
app.use(notFound);
app.use(errorsHandler);

export default app;
