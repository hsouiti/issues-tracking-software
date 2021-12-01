import express from 'express'

import errorsHandler from './middlewares/errorsHandler.js'

import projectsRouter from './routes/projects.js'
import usersRouter from './routes/users.js'
import ticketsRouter from './routes/tickets.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.send('Welcome'))
app.use('/api/v1/projects', projectsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/tickets', ticketsRouter)

app.use(errorsHandler)


export default app
