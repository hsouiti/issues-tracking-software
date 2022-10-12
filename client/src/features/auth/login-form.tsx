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
  /* const navigate = useNavigate(); */

  const [values, setValues] = useState<LoginRequest>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  /*  const [logUser, {isSuccess, isError, error}] = useLogUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  }; */

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <form className="max-w-[400px] w-full mx-auto bg-white p-8">
        <div className="inputs">
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="email"
              type="text"
              name="email"
              aria-label="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="password"
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
            className="bg-blue hover:bg-blue-dark  font-bold py-2 px-4 rounded"
            /*  onClick={handleSubmit} */
            type="button"
            disabled
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
