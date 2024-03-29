/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-assertion */

import jwt from 'jsonwebtoken';
import {Response} from 'express';
import {DecodedInput} from '../interfaces';
import {IUserModel} from '../models/User';

import config from '../../config/index';

// generate Token payload
export const generateTokenPayload = async (user: IUserModel): Promise<DecodedInput> => {
  return {userId: user._id, role: user.role};
};

// generateJWT
export const generateJWT = async (payload: DecodedInput): Promise<string> => {
  return jwt.sign(payload, config.JWT_TOKEN_SECRET!, {
    // expiresIn: config.JWT_TOKEN_TIME,
    expiresIn: '300s',
  });
};

// verify token
export const isValidToken = async (token: string): Promise<string | DecodedInput> => {
  return jwt.verify(token, config.JWT_TOKEN_SECRET!);
};

// save the token in the cookies & attach it to response
export const tokenToCookiesRes = async (res: Response, userToken: string): Promise<void> => {
  const ageToken = 1000 * 60 * 60 * 24;
  const options = {
    httpOnly: true,
    maxAge: ageToken,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  };
  res.cookie('access_token', userToken, options);
};
