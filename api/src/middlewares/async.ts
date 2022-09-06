import { Request, Response, NextFunction } from 'express'

type asyncFunc = (req: Request, res: Response, next: NextFunction) => Promise<any>

const asyncWrapper = (fn: asyncFunc) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default asyncWrapper
