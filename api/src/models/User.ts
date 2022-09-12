import {Document, Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import {roles} from '../helpers/constants';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserModel extends IUser, Document {
  comparePassword: (entredPassword: string) => Promise<boolean>;
}

// eslint-disable-next-line no-useless-escape
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const userSchema = new Schema<IUser>(
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
        // eslint-disable-next-line no-useless-escape
        validator: (mail: string) => emailRegex.test(mail),
        message: (props: {value: string}): string => `${props.value} is not a valid Email`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password must be provided'],
      validate: {
        validator: (pwd: string) => pwd.length >= 6,
        message: (props: {value: string}): string => `Password must be at least 6 characters.`,
      },
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
  {timestamps: true}
);

// hash the password
userSchema.pre('save', async function (this: IUserModel) {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassword = async function (entredPassword: string): Promise<boolean> {
  return await bcrypt.compare(entredPassword, this.password);
};

const User = model<IUserModel>('User', userSchema);
export default User;
