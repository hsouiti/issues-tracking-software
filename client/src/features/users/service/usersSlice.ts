import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {IUser} from '../types';

//const initialState = { value: 0 } as CounterState

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as IUser[],
  },
  reducers: {
    getUsers: (state, {payload}: PayloadAction<{total: number; users: IUser[]}>) => {
      console.log('payload', payload);

      state.users = payload.users;
    },
  },
});

export const {getUsers} = usersSlice.actions;

export default usersSlice.reducer;
