import User from '../models/users.js'

import APIError from '../errors/APIError.js'
import HttpStatusCodes from '../errors/statusCodes.js'
import { generateTokenPayload, tokenToCookiesRes } from '../helpers/authJWT.js'

// register
export const register = async (req, res, next) => {
  const { name, password, email } = req.body

  const isUserExist = await User.findOne({ email })
  if (isUserExist) {
    return next(APIError.BadRequest('Email already exists'))
  }
  // the first user is admin
  // how to attribute other roles (from register or from managing the users)
  //
  const user = await User.create(req.body)

  const userToken = await generateTokenPayload(user)
  await tokenToCookiesRes(res, userToken)

  res
    .status(HttpStatusCodes.CREATED)
    .json({ status: 'success', data: userToken })
}

// login
export const login = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(APIError.BadRequest('Please provide email & password'))
  }
  const user = await User.findOne({ email })

  if (user) {
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return next(APIError.Unauthorized('Invalid Credentials'))
    }

    const userToken = await generateTokenPayload(user)
    await tokenToCookiesRes(res, userToken)

    return res
      .status(HttpStatusCodes.OK)
      .json({ status: 'success', data: userToken })
  }
  return next(APIError.Unauthorized('Invalid Credentials'))
}

// logout
export const logout = async (req, res, next) => {
  res.clearCookie('accessToken')

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: { message: 'User logged out succefully' },
  })
}
