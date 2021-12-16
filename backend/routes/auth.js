import express from 'express';
import asyncWrapper from '../middlewares/async.js';

const authRouter = express.Router();

import { register, login } from '../controllers/auth.js';

authRouter.route('/register').post(asyncWrapper(register));

authRouter.route('/login').post(asyncWrapper(login));

export default authRouter;
