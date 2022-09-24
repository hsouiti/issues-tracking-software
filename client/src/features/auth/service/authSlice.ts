import {createSlice} from '@reduxjs/toolkit';

import {AuthState, User} from '../types';
import {RootState} from '../../store';

const initialState: AuthState = {user: null, token: null};
import {authApi} from '../api/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.logUser.matchFulfilled, (state, {payload}) => {
      state.token = payload.token;
      state.user = payload.user;
      localStorage.setItem('access_token', JSON.stringify(payload.token));
    });
  },
});

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
