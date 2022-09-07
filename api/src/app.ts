import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from '../config/index'

import errorsHandler from './middlewares/errorsHandler'
import notFound from './middlewares/notFound'

import projectsRouter from './routes/projects'
import usersRouter from './routes/users'
import ticketsRouter from './routes/tickets'
import authRouter from './routes/auth'

const app = express()
const dirName = path.resolve()

// middelwaress
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser(config.PARSER_SECRET))
app.use(express.static(path.join(dirName, 'build')))
app.use(cors())

// Routes
app.use('/api/v1/projects', projectsRouter)
app.use('/api/v1/auth', authRouter)
/* app.use('/api/v1/users', usersRouter)
app.use('/api/v1/tickets', ticketsRouter) */

// Errors Handler
app.use(notFound)
app.use(errorsHandler)

export default app
