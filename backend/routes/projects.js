import express from 'express'
import asyncWrapper from '../middlewares/async.js'
const projectsRouter = express.Router()

import {
  getAllProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
} from '../controllers/projects.js'

projectsRouter
  .route('/')
  .get(asyncWrapper(getAllProjects))
  .post(asyncWrapper(createProject))

projectsRouter
  .route('/:id')
  .get(asyncWrapper(getProject))
  .patch(asyncWrapper(updateProject))
  .delete(asyncWrapper(deleteProject))


 

export default projectsRouter
