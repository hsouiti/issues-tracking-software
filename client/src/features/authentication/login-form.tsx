/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ErrorType} from '../../types';

import {AuthState} from './types';
import {useLogUserMutation} from './api/auth';
import {setUser} from './service/authSlice';

const initialState = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const [logUser, {data, isSuccess, isError, error}] = useLogUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
  };

  const signIn = async () => {
    try {
      const {email, password} = values;
      const user = await logUser({email, password}).unwrap();
      console.log('userData', user);
      // navigate to "/"
    } catch (error: unknown) {
      const err = error as ErrorType;
      console.log(error);

      console.log('their ', err.message);
    }
  };

  return (
    <>
      <div>
        <form className="max-w-[400px] w-full mx-auto bg-white p-8" onSubmit={handleSubmit}>
          <div className="inputs">
            <div>
              <label>Username</label>
              <input
                type="text"
                className="border"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                className="border"
                name="password"
                role="password"
                aria-label="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button style={{padding: '10px 20px', border: '1px solid gray'}}>Sign In</button>
          <button>Cancel </button>
        </form>
      </div>
    </>
  );
};
