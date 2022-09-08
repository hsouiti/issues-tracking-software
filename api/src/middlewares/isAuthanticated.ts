import APIError from '../errors/APIError';
import {Request, Response, NextFunction} from 'express';
import HttpStatusCodes from '../errors/statusCodes';
import {isValidToken} from '../helpers/authJWT';
import {ErrorType, DecodedInput} from '../interfaces';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const accessToken: string | null = req.signedCookies.accessToken;

  if (accessToken === null) {
    return next(APIError.Unauthorized('Authentication failed'));
  }
  try {
    const decodedToken = (await isValidToken(accessToken)) as DecodedInput;

    const {userId, role} = decodedToken;
    const user = {userId, role};
    // req.user = user;
    next();
  } catch (error: unknown) {
    const err = error as ErrorType;
    err.statusCode = HttpStatusCodes.UNAUTHORIZED;
    next(error);
  }
};

export default isAuthenticated;
