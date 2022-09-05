import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { roles } from '../helpers/constants.js';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User name must be provided'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'User Email must be provided'],
      validate: {
        validator: (mail) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(mail),
        message: (props) => `${props.value} is not a valid Email`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password must be provided'],
      min: [6, '{VALUE} must be at least 6'],
    },
    role: {
      type: String,
      required: [true, 'Role must be provided'],
      enum: {
        values: Object.values(roles),
        message: `{VALUE} is not supported`,
      },
      default: 'submitter',
    },
  },
  { timestamps: true }
);

// hash the password
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassword = async function (entredPassword) {
  return await bcrypt.compare(entredPassword, this.password);
};



const User = model('User', userSchema)
export default User
