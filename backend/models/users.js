import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name must be provided'],
  },
  email: {
    type: String,
    validate: {
      validator: (mail) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(mail),
      message: (props) => `${props.value} is not a valid Email`,
    },
    required: [true, 'User Email must be provided'],
  },
  password: {
    type: String,
    required: [true, 'Password must be provided'],
    min: [6, '{VALUE} must be at least 6'],
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'project manager', 'developer', 'submitter'],
      message: `{VALUE} is not supported`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default model('User', userSchema)
