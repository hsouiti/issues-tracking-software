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
//.post([isAuthenticated, isAuthorized], asyncWrapper(createUser));

usersRouter
  .route('/:id') // access granted for admins and for the current user
  .get(isAuthenticated, asyncWrapper(getUser))
  .patch(
    [isAuthenticated, isAuthorized('admin', 'manager')],
    asyncWrapper(updateUser)
  )
  .delete(
    [isAuthenticated, isAuthorized('admin', 'manager')],
    asyncWrapper(deleteUser)
  )

export default usersRouter
