import {JwtPayload} from 'jsonwebtoken';

export interface ErrorType {
  message?: string;
  name?: string;
  stack?: string;
  statusCode?: number;
}

export interface UserInput {
  _id: string;
  userId: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface DecodedInput extends JwtPayload {
  userId?: string;
  role?: string;
}

export interface Roles {
  admin?: string;
  manager?: string;
  developer?: string;
  submitter?: string;
}
