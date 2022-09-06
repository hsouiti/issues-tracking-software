import { Request, Response, NextFunction } from 'express'
/* (req: Request, res: Response, next: NextFunction) */
type SuccessHandler = (address: string) => string
const asyncWrapper = fn => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default asyncWrapper
