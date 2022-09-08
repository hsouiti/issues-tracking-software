import {Request, Response, NextFunction} from 'express';
import User from '../models/User';

import APIError from '../errors/APIError';
import HttpStatusCodes from '../errors/statusCodes';
import {generateTokenPayload, tokenToCookiesRes} from '../helpers/authJWT';

// register
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {email} = req.body;

  const isUserExist = await User.findOne({email});

  if (isUserExist != null) {
    return next(APIError.BadRequest('Email already exists'));
  }
  // the first user is admin
  // how to attribute other roles (from register or from managing the users)
  //
  const user = await User.create(req.body);

  const userToken = await generateTokenPayload(user);
  await tokenToCookiesRes(res, userToken);
  res.status(HttpStatusCodes.CREATED).json({status: 'success', data: userToken});
};

// login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  /* if (!email || !password) {
    return next(APIError.BadRequest('Please provide email & password'));
  } */
  const user = await User.findOne({email});

  if (user != null) {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(APIError.Unauthorized('Invalid Credentials'));
    }

    const userToken = 'gggggggggggggggggggggggggggggg';
    /*  const userToken = await generateTokenPayload(user);
    await tokenToCookiesRes(res, userToken); */

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
