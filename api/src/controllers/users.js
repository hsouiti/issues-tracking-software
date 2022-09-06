import User from '../models/users.js'
import mongoose from 'mongoose'
import APIError from '../errors/APIError.js'
import HttpStatusCodes from '../errors/statusCodes.js'

// get all the users
// TODO: Limit && sort users
/*

*/
export const getAllUsers = async (req, res, next) => {
  const users = await User.find({})
    .sort({ createdAt: 'desc' })
    .select('-password')

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: {
      total: users.length,
      users,
    },
  })
}

// get a single user
export const getUser = async (req, res, next) => {
  const { id: userID } = req.params

  const user = await User.findOne({ _id: userID }).select('-password')

  if (!user) {
    return next(APIError.HTTP400Error(`No User with id: ${userID}`))
  }

  res.status(HttpStatusCodes.OK).json({ status: 'success', data: user })
}

// create user
export const createUser = async (req, res, next) => {
  const user = await User.create(req.body)
  res.status(HttpStatusCodes.CREATED).json({ user })
}

// TODO: update user without password
export const updateUser = async (req, res, next) => {
  const { id: userID } = req.params

  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  }).select('-password')

  if (!user) {
    return next(APIError.HTTP400Error(`No User with id: ${userID}`))
  }

  res.status(HttpStatusCodes.ACCEPTED).json({ status: 'success', data: user })
}

// TODO: update password

// delete user
export const deleteUser = async (req, res, next) => {
  const { id: userID } = req.params

  const user = await User.findOneAndDelete({ _id: userID })

  if (!user) {
    return next(APIError.HTTP400Error(`No User with id: ${userID}`))
  }

  res.status(HttpStatusCodes.ACCEPTED).json({
    status: 'success',
    data: { message: ' User deleted succefully' },
  })
}
