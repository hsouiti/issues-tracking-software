import HttpStatusCode from './statusCodes'
import { ErrorType } from '../interfaces'

export default class APIError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }

  static BadRequest(msg: string): ErrorType {
    return new APIError(HttpStatusCode.BAD_REQUEST, msg)
  }

  static HTTP400Error(msg: string): ErrorType {
    return new APIError(HttpStatusCode.NOT_FOUND, msg)
  }

  static Unauthorized(msg: string): ErrorType {
    return new APIError(HttpStatusCode.UNAUTHORIZED, msg)
  }

  static Forbidden(msg: string): ErrorType {
    return new APIError(HttpStatusCode.FORBIDDEN, msg)
  }

  static Internal(msg: string): ErrorType {
    return new APIError(HttpStatusCode.INTERNAL_SERVER_ERROR, msg)
  }
}
