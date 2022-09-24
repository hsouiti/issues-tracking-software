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
  // await tokenToCookiesRes(res, userToken);
  res.status(HttpStatusCodes.CREATED).json({status: 'success', data: userToken});
};

// login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;

  if (email === '' || password === '') {
    return next(APIError.BadRequest('Please provide email & password'));
  }
  // console.log(req);

  /* res.clearCookie('accessToken');
  res.clearCookie('access_token'); */

  const authHeader = req.headers.authorization;
  console.log('authHeader', authHeader);
  /*  const token = req.signedCookies.access_token;
  console.log('token', token); */
  console.log('*************************************************************');

  const user = await authServices.login(email);

  if (user !== null) {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(APIError.Unauthorized('Invalid Credentials'));
    }

    // Add user_id fron response
    const userToken = await generateJWT({user_id: user._id});
    // await tokenToCookiesRes(res, userToken);
    const {email, name, role} = user;
    return res.status(HttpStatusCodes.OK).json({user: {name, email, role}, token: userToken});
  }

  return next(APIError.Unauthorized('Invalid Credentials'));
};

// logout
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('access_token');

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: {message: 'User logged out succefully'},
  });
};
