import express from 'express'
const usersRouter = express.Router()

import {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} from '../controllers/users.js'

usersRouter.route('/').get(getAllUsers).post(createUser)

usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default usersRouter
