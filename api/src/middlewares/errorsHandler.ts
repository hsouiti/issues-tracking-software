/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import HttpStatusCodes from '../errors/statusCodes';

const errorsHanlder = (err, req, res, next) => {
  // console.log(err);

  const showError = {
    statusCode: err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  };

  // monoose schema validation errors
  if (err.message.includes('validation failed') || err.name === 'ValidationError') {
    showError.message = Object.values(err.errors)
      .map(error => error.properties.message)
      .join(', ');
    showError.statusCode = HttpStatusCodes.BAD_REQUEST;
  }

  // Duplicate Key (unique)
  if (err.code && err.code === 11000) {
    showError.statusCode = HttpStatusCodes.BAD_REQUEST;

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    showError.message = `${Object.values(
      err.keyValue
    )} is already exist, please choose another one`;
  }

  // CastError
  if (err.name === 'CastError') {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    showError.message = `No item found with id: ${err.value}`;
    showError.statusCode = HttpStatusCodes.BAD_REQUEST;
  }
  // jwt must be provided
  if (err.name === 'JsonWebTokenError') {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    showError.message = 'Authentication required';
    showError.statusCode = HttpStatusCodes.UNAUTHORIZED;
  }

  return res.status(showError.statusCode).json({
    message: showError.message,
  });
};

export default errorsHanlder;
