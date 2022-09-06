import APIError from '../errors/APIError.js'
import HttpStatusCodes from '../errors/statusCodes.js'
import { isValidToken } from '../helpers/authJWT.js'

const isAuthenticated = async (req, res, next) => {
  const accessToken = req.signedCookies.accessToken

  if (!accessToken) {
    return next(APIError.Unauthorized('Authentication failed'))
  }

  try {
    const decodeToken = await isValidToken(accessToken)
    const { userId, role } = decodeToken
    req.user = { userId, role }
    next()
  } catch (error) {
    error.statusCode = HttpStatusCodes.UNAUTHORIZED
    next(error)
  }
}

export default isAuthenticated
