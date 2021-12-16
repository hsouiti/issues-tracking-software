import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        values: ['admin', 'project manager', 'developer', 'submitter'],
        message: `{VALUE} is not supported`,
      },
      default: 'developer',
    },
  },
  { timestamps: true }
);

// hash the password
userSchema.pre('save', async function () {
  console.log('herre');
  if (!this.isModified('password')) return;
  console.log('yyyyyyyyyy');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassord = async function (entredPassword) {
  return await bcrypt.compare(entredPassword, this.password);
};

// create to token method
userSchema.methods.createToken = async function () {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      payload: '',
    },
    procee.env.JWT_SECRET
  );

  jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: 'foobar',
    },
    'secret'
  );
};



const User = model('User', userSchema)
export default User
