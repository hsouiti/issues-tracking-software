import User from '../models/users.js';

import APIError from '../errors/APIError.js';
import HttpStatusCodes from '../errors/statusCodes.js';

export const register = async (req, res, next) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.status(HttpStatusCodes.CREATED).json({ status: 'success', data: user });
};

export const login = async (req, res, next) => {
  res.json({ msg: 'Login' });
};
