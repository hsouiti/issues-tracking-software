import User from '../models/users.js'
import mongoose from 'mongoose'
import APIError from '../errors/APIError.js'
import statusCodes from '../errors/statusCodes.js'

const { ObjectId } = mongoose.Types

// get all the users
// TODO: Limit && sort users
/*

*/
export const getAllUsers = async (req, res, next) => {
  const users = await User.find({}).sort({ createdAt: 'desc' })
  res.status(statusCodes.OK).json({ total: users.length, users })
}

// get a single user
export const getUser = async (req, res, next) => {
  const { id: userID } = req.params

  if (!ObjectId.isValid(userID)) {
    return next(APIError.BadRequest(`${userID}: Invalid ID format`))
  }

  const user = await User.findOne({ _id: userID })

  if (!user) {
    return next(APIError.HTTP400Error(`No User with id: ${userID}`))
  }

  res.status(statusCodes.OK).json({ user })
}

// create user
export const createUser = async (req, res, next) => {
  const user = await User.create(req.body)
  res.status(statusCodes.CREATED).json({ user })
}

// update user
export const updateUser = async (req, res, next) => {
  const { id: userID } = req.params

  if (!ObjectId.isValid(userID)) {
    return next(APIError.BadRequest(`${userID}: Invalid ID format`))
  }

  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    return next(APIError.HTTP400Error(`No User with id: ${userID}`))
  }

  res.status(statusCodes.ACCEPTED).json({ user })
}

// delete user
export const deleteUser = async (req, res, next) => {
  const { id: userID } = req.params

  if (!ObjectId.isValid(userID)) {
    return next(APIError.BadRequest(`${userID}: Invalid ID format`))
  }

  const user = await User.findOneAndDelete({ _id: userID })

  if (!user) {
    return next(APIError.HTTP400Error(`No User with id: ${userID}`))
  }

  res.status(statusCodes.ACCEPTED).json({ user })
}
