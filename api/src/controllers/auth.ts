import {Request, Response, NextFunction} from 'express';
import User from '../models/User';

import * as authServices from '../services/auth';

import APIError from '../errors/APIError';
import HttpStatusCodes from '../errors/statusCodes';
import {generateTokenPayload, generateJWT, tokenToCookiesRes} from '../helpers/authJWT';

// register
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {email} = req.body;

  const isUserExist = await authServices.checkIfUserExist(email);

  if (isUserExist !== null) {
    return next(APIError.BadRequest('Email already exists'));
  }
  // TODO:
  // the first user is admin
  // how to attribute other roles (from register or from managing the users)
  //
  const user = await authServices.register(req.body);

  const userToken = await generateTokenPayload(user);
  await tokenToCookiesRes(res, userToken);
  res.status(HttpStatusCodes.CREATED).json({status: 'success', data: userToken});
};

// login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;

  if (email === '' || password === '') {
    return next(APIError.BadRequest('Please provide email & password'));
  }
  const user = await authServices.login(email);

  if (user !== null) {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(APIError.Unauthorized('Invalid Credentials'));
    }
    // let userToken = ''

    // const userToken = await generateJWT(user);
    // await tokenToCookiesRes(res, userToken);
    console.log('user', user);

    // delete user.password;

    // Add user_id fron response
    const userToken = await generateJWT({user_id: user._id});

    return res.status(HttpStatusCodes.OK).json({status: 'success', data: userToken});
  }
  return next(APIError.Unauthorized('Invalid Credentials'));
};

// logout
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('accessToken');

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: {message: 'User logged out succefully'},
  });
};
