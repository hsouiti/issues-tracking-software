import express from 'express'
import asyncWrapper from '../middlewares/async'

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

const projectsRouter = express.Router()

projectsRouter
  .route('/')
  // access granted for all users
  .get(isAuthenticated, asyncWrapper(getAllProjects))
// access granted for admins/project managers
// .post([isAuthenticated, isAuthorized('admin', 'manager')], asyncWrapper(createProject))

projectsRouter
  .route('/:id')
  // access granted for all users
  .get(isAuthenticated, asyncWrapper(getProject))
// access granted for admins/project managers
// .patch([isAuthenticated, isAuthorized('admin', 'manager')], asyncWrapper(updateProject))
// access granted for admins/project managers
// .delete([isAuthenticated, isAuthorized('admin', 'manager')], asyncWrapper(deleteProject))

// projectsRouter.route('/:id/tickets').get(isAuthenticated, asyncWrapper(getSingleProjectTickets))

export default projectsRouter
