import express from 'express'
import asyncWrapper from '../middlewares/async.js';
const usersRouter = express.Router();

import {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} from '../controllers/users.js';

usersRouter
  .route('/')
  .get(asyncWrapper(getAllUsers))
  .post(asyncWrapper(createUser));

usersRouter
  .route('/:id')
  .get(asyncWrapper(getUser))
  .patch(asyncWrapper(updateUser))
  .delete(asyncWrapper(deleteUser));

export default usersRouter
