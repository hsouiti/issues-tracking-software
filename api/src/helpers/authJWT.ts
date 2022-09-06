import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { TokenInput, UserInput } from '../interfaces'

import config from '../../config/index'

// generate Token payload
export const generateTokenPayload = (user: UserInput): TokenInput => {
  return { userId: user._id, role: user.role }
}

// generateJWT
export const generateJWT = (payload: TokenInput): string => {
  return jwt.sign(payload, config.JWT_TOKEN_SECRET, {
    expiresIn: config.JWT_TOKEN_TIME,
  })
}

// verify token
export const isValidToken = (token: string): string => {
  return jwt.verify(token, config.JWT_TOKEN_SECRET)
}

// save the token in the cookies & attach it to response
export const tokenToCookiesRes = async (res: Response, userToken: TokenInput): Promise<void> => {
  const accessToken = await generateJWT(userToken)
  const ageToken = 1000 * 60 * 60 * 24
  const options = {
    httpOnly: true,
    maxAge: ageToken,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  }

  res.cookie('accessToken', accessToken, options)
}
