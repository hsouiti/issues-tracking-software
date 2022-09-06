import APIError from '../errors/APIError'
import { Request, Response, NextFunction } from 'express'
import HttpStatusCodes from '../errors/statusCodes'
import { isValidToken } from '../helpers/authJWT'
import { ErrorType } from '../types'

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const accessToken: string | null = req.signedCookies.accessToken

  if (accessToken == null) {
    return next(APIError.Unauthorized('Authentication failed'))
  }

  try {
    const decodeToken = await isValidToken(accessToken)
    const { userId, role } = decodeToken
    req.user = { userId, role }
    next()
  } catch (error: unknown) {
    const err = error as ErrorType
    err.statusCode = HttpStatusCodes.UNAUTHORIZED
    next(error)
  }
}

export default isAuthenticated
