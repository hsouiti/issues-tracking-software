import HttpStatusCodes from '../errors/statusCodes.js'

const errorsHanlder = (err, req, res, next) => {
  console.log(err.message)
  // TODO: mongoose validatiton Errors
  let showError = {
    statusCode: err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  }

  return res.status(showError.statusCode).json({
    status: 'error',
    statusCode: showError.statusCode,
    message: showError.message,
  })
}

export default errorsHanlder
