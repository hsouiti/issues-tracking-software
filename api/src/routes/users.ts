import express from 'express';
import asyncWrapper from '../middlewares/async';

import {getAllUsers, updateUser, getUser, createUser, deleteUser} from '../controllers/users';
import isAuthenticated from '../middlewares/isAuthanticated';
import isAuthorized from '../middlewares/isAuthorized';

const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(/* isAuthenticated, */ asyncWrapper(getAllUsers))
  .post([isAuthenticated, isAuthorized('admin', 'manager')], asyncWrapper(createUser));

usersRouter
  .route('/:id') // access granted for admins and for the current user
  .get(/* isAuthenticated, */ asyncWrapper(getUser))
  .patch(/* [isAuthenticated, isAuthorized('admin', 'manager')], */ asyncWrapper(updateUser))
  .delete(/* [isAuthenticated, isAuthorized('admin', 'manager')], */ asyncWrapper(deleteUser));

export default usersRouter;
