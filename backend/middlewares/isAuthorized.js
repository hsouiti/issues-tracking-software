import APIError from '../errors/APIError.js'

// TODO: for the roles developer & submitter
//        check if he has the permissions to see (his profile)

const isAuthorized = (...roles) => {
  return (req, res, next) => {
    console.log('roles', roles, req.user)
    if (!roles.includes(req.user.role)) {
      return next(APIError.Forbidden("you don't have access authorization"))
    }
    next()
  }
}

export default isAuthorized

