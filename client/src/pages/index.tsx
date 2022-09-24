import {useSelector} from 'react-redux';
import {getCurrentToken, getCurrentUser} from '../features/auth/service/authSlice';
import {UsersList} from '../features/users/usersList';

export const Home = () => {
  const user = useSelector(getCurrentUser);
  const token = useSelector(getCurrentToken);

  return (
    <div>
      Users :
      <UsersList />
    </div>
  );
};
