import express from 'express'
import asyncWrapper from '../middlewares/async'
const projectsRouter = express.Router()

import isAuthenticated from '../middlewares/isAuthanticated'
import isAuthorized from '../middlewares/isAuthorized'

import {
  getAllProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
} from '../controllers/projects'
import { getSingleProjectTickets } from '../controllers/tickets'

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
