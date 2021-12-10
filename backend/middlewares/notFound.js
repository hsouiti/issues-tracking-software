import statusCodes from '../errors/statusCodes.js'

const notFound = (req, res) =>
  res.status(statusCodes.NOT_FOUND).json({
    status: 'error',
    statusCode: statusCodes.NOT_FOUND,
    message: 'Route does not exist',
  })

export default notFound
