import APIError from '../errors/APIError'
import { Request, Response, NextFunction } from 'express'
import HttpStatusCodes from '../errors/statusCodes'
import { isValidToken } from '../helpers/authJWT'
import { ErrorType } from '../interfaces'

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const accessToken: string | null = req.signedCookies.accessToken
  console.log('accesstoken', accessToken)

  if (accessToken == null) {
    return next(APIError.Unauthorized('Authentication failed'))
  }
  return true
  /*  try {
    const decodeToken = await isValidToken(accessToken)
    const { userId, role } = decodeToken
    console.log(userId, role)
    // req.user = { userId, role }
    next()
  } catch (error: unknown) {
    const err = error as ErrorType
    err.statusCode = HttpStatusCodes.UNAUTHORIZED
    next(error)
  } */
}

export default isAuthenticated
