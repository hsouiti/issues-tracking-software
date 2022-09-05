import HttpStatusCodes from '../errors/statusCodes.js';

const errorsHanlder = (err, req, res, next) => {
  //console.log(err)

  let showError = {
    statusCode: err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  }

  // monoose schema validation errors
  if (
    err.message.includes('validation failed') ||
    err.name === 'ValidationError'
  ) {
    showError.message = Object.values(err.errors)
      .map((error) => error.properties.message)
      .join(', ')
    showError.statusCode = HttpStatusCodes.BAD_REQUEST
  }

  // Duplicate Key (unique)
  if (err.code && err.code === 11000) {
    showError.statusCode = HttpStatusCodes.BAD_REQUEST
    showError.message = `${Object.values(
      err.keyValue
    )} is already exist, please choose another one`
  }

  // CastError
  if (err.name === 'CastError') {
    showError.message = `No item found with id: ${err.value}`
    showError.statusCode = HttpStatusCodes.BAD_REQUEST
  }

  return res.status(showError.statusCode).json({
    status: 'error',
    statusCode: showError.statusCode,
    message: showError.message,
  })
};

export default errorsHanlder;
