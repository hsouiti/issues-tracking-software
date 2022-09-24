import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store';

const baseUrl = 'http://localhost:4500/api/v1/';

const accessToken = JSON.parse(localStorage.getItem('access_token') || '{}');

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, {getState}) => {
    const token: string | null = (getState() as RootState).auth.token || accessToken;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
  credentials: 'include',
});

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
