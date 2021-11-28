import User from '../models/users.js'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

// get all the users
// TODO: Limit && sort users
/*

*/
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: 'desc' })
  res.status(201).json({ users })
}

// get a single user
export const getUser = async (req, res) => {
  const { id: userID } = req.params

  if (!ObjectId.isValid(userID)) {
    return res.status(404).json({ msg: `${userID}: Invalid ID format` })
  }

  const user = await User.findOne({ _id: userID })

  if (!user) {
    return res.status(404).json({ msg: `No User with id: ${userID}` })
  }

  res.status(200).json({ user })
}

// create user
export const createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.status(200).json({ user })
}

// update user
export const updateUser = async (req, res) => {
  const { id: userID } = req.params

  if (!ObjectId.isValid(userID)) {
    return res.status(404).json({ msg: `${userID}: Invalid ID format` })
  }

  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    return res.status(404).json({ msg: `No User with id: ${userID}` })
  }

  res.status(202).json({ user })
}

// delete user
export const deleteUser = async (req, res) => {
  const { id: userID } = req.params

  if (!ObjectId.isValid(userID)) {
    return res.status(404).json({ msg: `${userID}: Invalid ID format` })
  }

  const user = await User.findOneAndDelete({ _id: userID })

  if (!user) {
    return res.status(404).json({ msg: `No User with id: ${userID}` })
  }

  res.status(202).json({ user })
}
