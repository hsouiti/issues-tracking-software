import {Request, Response, NextFunction} from 'express';
import User from '../models/User';
import APIError from '../errors/APIError';
import HttpStatusCodes from '../errors/statusCodes';

// get all the users
// TODO: Limit && sort users
/*

*/
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log('respon', req);
  const users = await User.find({}).sort({createdAt: 'desc'}).select('-password');

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: {
      total: users.length,
      users,
    },
  });
};

// get a single user
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {id: userID} = req.params;

  const user = await User.findOne({_id: userID}).select('-password');

  if (user == null) {
    return next(APIError.HTTP400Error(`No User with id: ${userID}`));
  }

  res.status(HttpStatusCodes.OK).json({status: 'success', data: user});
};

// create user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await User.create(req.body);
  res.status(HttpStatusCodes.CREATED).json({user});
};

// TODO: update user without password
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {id: userID} = req.params;

  const user = await User.findOneAndUpdate({_id: userID}, req.body, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (user == null) {
    return next(APIError.HTTP400Error(`No User with id: ${userID}`));
  }

  res.status(HttpStatusCodes.ACCEPTED).json({status: 'success', data: user});
};

// TODO: update password

// delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const {id: userID} = req.params;

  const user = await User.findOneAndDelete({_id: userID});

  if (user == null) {
    return next(APIError.HTTP400Error(`No User with id: ${userID}`));
  }

  res.status(HttpStatusCodes.ACCEPTED).json({
    status: 'success',
    data: {message: ' User deleted succefully'},
  });
};
