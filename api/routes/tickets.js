import express from 'express'
import asyncWrapper from '../middlewares/async.js'
const ticketsRouter = express.Router()

import isAuthenticated from '../middlewares/isAuthanticated.js'
import isAuthorized from '../middlewares/isAuthorized.js'

import {
  getAllTickets,
  createTicket,
  updateTicket,
  getTicket,
  deleteTicket,
} from '../controllers/tickets.js'

ticketsRouter
  .route('/')
  .get(asyncWrapper(getAllTickets)) // access granted for all users
  .post(asyncWrapper(createTicket)) // access granted for admins/ticket managers

ticketsRouter
  .route('/:id')
  .get(asyncWrapper(getTicket)) // access granted for all users
  .patch(asyncWrapper(updateTicket)) // access granted for admins/ticket managers
  .delete(asyncWrapper(deleteTicket)) // access granted for admins/ticket managers

export default ticketsRouter
