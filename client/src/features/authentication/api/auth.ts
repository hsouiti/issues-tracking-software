import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {AuthState, User} from '../types';

const baseURL = 'http://localhost:4500/api/v1/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: baseURL}),
  endpoints: (builder) => ({
    logUser: builder.mutation<AuthState, Partial<User>>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLogUserMutation} = authApi;
