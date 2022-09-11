import User, {IUser} from '../models/User';

const getAllUsers = async () => {
  return await User.find({}).sort({createdAt: 'desc'}).select('-password');
};

const getUser = async (userID: string) => {
  return await User.findOne({_id: userID}).select('-password');
};

const updateUser = async (userID: string, body: IUser) => {
  return await User.findOneAndUpdate({_id: userID}, body, {
    new: true,
    runValidators: true,
  }).select('-password');
};

const deleteUser = async (userID: string) => {
  return await User.findOneAndDelete({_id: userID});
};

export {getAllUsers, getUser, updateUser, deleteUser};
