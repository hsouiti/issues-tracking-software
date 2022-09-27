import {useMemo} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getCurrentToken} from '../features/auth/service/authSlice';

export const useAuth = () => {
  function parseJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  const isValidToken = () => {
    const tokenString = localStorage.getItem('access_token');
    const decodedJwt = tokenString ? parseJwt(tokenString) : null;

    if (decodedJwt) {
      return Math.floor(new Date().getTime()) < decodedJwt.exp * 1000;
    } else {
      return false;
    }
  };
  return isValidToken();
};
