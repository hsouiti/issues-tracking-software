import User, {IUser} from '../models/User';

const checkIfUserExist = async (email: string) => await User.findOne({email});

const register = async (user: IUser) => {
  return await User.create(user);
};

const login = async (email: string) => {
  return await User.findOne({email});
};

export {checkIfUserExist, register, login};
