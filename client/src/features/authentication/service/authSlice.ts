import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {AuthState} from '../types';
import {RootState} from '../../store';

const authSlice = createSlice({
  name: 'auth',
  initialState: {user: null, token: null} as AuthState,
  reducers: {
    setUser: (state, {payload}: PayloadAction<AuthState>) => {
      const {user, token} = payload;
      console.log('usere', user);

      state.user = user;
      state.token = token;
    },
  },
});

export const {setUser} = authSlice.actions;
export const getCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
