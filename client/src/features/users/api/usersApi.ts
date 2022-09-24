import {api} from '../../app/api';
import {IUser} from '../types';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({url: 'users'}),
    }),
  }),
});

export const {useGetUsersQuery} = usersApi;
