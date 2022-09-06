import express from 'express'
import asyncWrapper from '../middlewares/async.js'
const projectsRouter = express.Router()

import isAuthenticated from '../middlewares/isAuthanticated.js'
import isAuthorized from '../middlewares/isAuthorized.js'

import {
  getAllProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
} from '../controllers/projects.js'
import { getSingleProjectTickets } from '../controllers/tickets.js'

projectsRouter
  .route('/')
  .get(isAuthenticated, asyncWrapper(getAllProjects)) // access granted for all users
  .post(
    [isAuthenticated, isAuthorized('admin', 'manager')],
    asyncWrapper(createProject)
  ) // access granted for admins/project managers

projectsRouter
  .route('/:id')
  .get(isAuthenticated, asyncWrapper(getProject)) // access granted for all users
  .patch(
    [isAuthenticated, isAuthorized('admin', 'manager')],
    asyncWrapper(updateProject)
  ) // access granted for admins/project managers
  .delete(
    [isAuthenticated, isAuthorized('admin', 'manager')],
    asyncWrapper(deleteProject)
  ) // access granted for admins/project managers

projectsRouter
  .route('/:id/tickets')
  .get(isAuthenticated, asyncWrapper(getSingleProjectTickets))

export default projectsRouter
