import express from 'express'
import asyncWrapper from '../middlewares/async.js'

const authRouter = express.Router()

import { register, login, logout } from '../controllers/auth.js'

authRouter.route('/register').post(asyncWrapper(register))

authRouter.route('/login').post(asyncWrapper(login))

authRouter.route('/logout').get(asyncWrapper(logout))
export default authRouter
