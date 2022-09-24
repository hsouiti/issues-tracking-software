import APIError from '../errors/APIError';
import {Request, Response, NextFunction} from 'express';
import HttpStatusCodes from '../errors/statusCodes';
import {isValidToken} from '../helpers/authJWT';
import {ErrorType, DecodedInput} from '../interfaces';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // const authHeader: string = req.headers.authorization;
  const authHeader = req.headers.authorization;

  // check if the request headers contains a valid token format
  if (
    authHeader === 'undefined' ||
    authHeader === '' ||
    authHeader?.startsWith('Bearer') === false
  ) {
    return next(APIError.Unauthorized('Authentication failed'));
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const userToken: string = authHeader?.split(' ')[1];

  try {
    const decodedToken = await isValidToken(userToken);
    /*
    const {userId} = decodedToken as DecodedInput;
     req.user = {userId}; 
     */
    next();
  } catch (error: unknown) {
    const err = error as ErrorType;
    err.statusCode = HttpStatusCodes.UNAUTHORIZED;
    next(error);
  }
};

export default isAuthenticated;
