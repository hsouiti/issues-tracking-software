import HttpStatusCodes from '../errors/statusCodes.js'

const notFound = (req, res) =>
  res.status(HttpStatusCodes.NOT_FOUND).json({
    status: 'error',
    statusCode: HttpStatusCodes.NOT_FOUND,
    message: 'Route does not exist',
  })

export default notFound
