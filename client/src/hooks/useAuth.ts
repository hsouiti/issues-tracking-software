import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '../features/auth/service/authSlice';

export const useAuth = () => {
  const user = useSelector(getCurrentUser);
  return useMemo(() => ({user}), [user]);
};
