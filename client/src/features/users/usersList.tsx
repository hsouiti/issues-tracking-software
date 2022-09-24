import {useGetUsersQuery} from './api/usersApi';
import {getUsers} from './service/usersSlice';
import {useEffect, useState} from 'react';

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const {data, isFetching, isLoading} = useGetUsersQuery();
  //  console.log('users', data?.users);
  useEffect(() => {
    console.log('isFetc', isFetching);

    if (!isFetching) {
      setUsers(data?.users);
      console.log(users);
      getUsers(users);
    }
  }, [isFetching]);

  return (
    <div>
      <h1>usersList</h1>
      {users && users.map((u) => <h2 key={u._id}>{u.name}</h2>)}
    </div>
  );
};
