import express from 'express'

const app = express()

import projectsRouter from './routes/projects.js'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.send('Welcome'))
app.use('/api/v1/projects', projectsRouter)


export default app
