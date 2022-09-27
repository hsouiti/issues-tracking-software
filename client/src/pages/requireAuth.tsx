import {useLocation, Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export interface Props {
  children?: JSX.Element;
}

export function RequireAuth({children}: Props) {
  const isAuthenticated = useAuth();
  const location = useLocation();

  return isAuthenticated === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{path: location.pathname}} />
  );
}
