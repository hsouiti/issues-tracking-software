import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {useLogUserMutation} from './api/authApi';

import {ErrorType} from '../../types';
import {LoginRequest} from './types';

const initialState = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginRequest>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  const [logUser, {isSuccess, isError, error}] = useLogUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('here');

    try {
      const {email, password} = values;
      await logUser({email, password}).unwrap();

      navigate('/');
    } catch (error: unknown) {
      const err = error as ErrorType;
      console.log(error);

      console.log('their ', err.message);
      //console.log('aysnc error', err.data.message);
      console.log('aysnc error', err);
    }
  };

  return (
    <div className="h-screen bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center">
      <form className="max-w-[400px] w-full mx-auto bg-white py-16 px-8 border">
        <div className="inputs">
          <div className="mb-6">
            <input
              className="appearance-none border rounded-lg w-full py-2.5 px-3 text-grey-darker"
              placeholder="Your Email"
              type="text"
              name="email"
              aria-label="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <input
              className="bg-white border rounded-lg w-full py-2.5 px-3 text-grey-darker"
              placeholder="Password"
              type="password"
              name="password"
              role="password"
              aria-label="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-dark text-white w-full py-2.5 px-4 rounded cursor-pointer disabled:opacity-75"
            onClick={handleSubmit}
            type="button"
            disabled={false}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
