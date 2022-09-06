import express from 'express'
import asyncWrapper from '../middlewares/async'

const authRouter = express.Router()

import { register, login, logout } from '../controllers/auth'

authRouter.route('/register').post(asyncWrapper(register))

authRouter.route('/login').post(asyncWrapper(login))

authRouter.route('/logout').get(asyncWrapper(logout))
export default authRouter
