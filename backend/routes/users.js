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
import isAuthenticated from '../middlewares/isAuthanticated.js';
import isAuthorized from '../middlewares/isAuthorized.js';

usersRouter
  .route('/')
  .get(isAuthenticated, asyncWrapper(getAllUsers))
  .post([isAuthenticated, isAuthorized], asyncWrapper(createUser));

usersRouter
  .route('/:id')
  .get(asyncWrapper(getUser))
  .patch(asyncWrapper(updateUser))
  .delete(asyncWrapper(deleteUser));

export default usersRouter
