import express from 'express'

const projectsRouter = express.Router()

import {
  getAllProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
} from '../controllers/projects.js'

projectsRouter.route('/').get(getAllProjects).post(createProject)

projectsRouter
  .route('/:id')
  .get(getProject)
  .patch(updateProject)
  .delete(deleteProject)

export default projectsRouter
