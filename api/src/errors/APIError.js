import HttpStatusCode from './statusCodes.js'

export default class APIError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }

  static BadRequest(msg) {
    return new APIError(HttpStatusCode.BAD_REQUEST, msg)
  }

  static HTTP400Error(msg) {
    return new APIError(HttpStatusCode.NOT_FOUND, msg)
  }

  static Unauthorized(msg) {
    return new APIError(HttpStatusCode.UNAUTHORIZED, msg)
  }

  static Forbidden(msg) {
    return new APIError(HttpStatusCode.FORBIDDEN, msg)
  }
}
