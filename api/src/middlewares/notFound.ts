import HttpStatusCodes from '../errors/statusCodes';
import {Request, Response} from 'express';

const notFound = (req: Request, res: Response): void => {
  res.status(HttpStatusCodes.NOT_FOUND).json({
    status: 'error',
    statusCode: HttpStatusCodes.NOT_FOUND,
    message: 'Route does not exist',
  });
};

export default notFound;
