import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {api} from '../../app/api';
import {AuthState, LoginRequest} from '../types';

const baseUrl = 'http://localhost:4500/api/v1/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['login'],
  endpoints: (builder) => ({
    logUser: builder.mutation<AuthState, LoginRequest>({
      query: (loginData) => ({
        url: `/login`,
        method: 'POST',
        body: loginData,
        // enable RTK Query to send the cookies along with the request.
        credentials: 'include',
      }),
      invalidatesTags: ['login'],
    }),
  }),
});

export const {useLogUserMutation} = authApi;
