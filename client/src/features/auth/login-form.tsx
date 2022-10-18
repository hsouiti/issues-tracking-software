import React, {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import {FiLogIn} from 'react-icons/fi';

import {useLogUserMutation} from './api/authApi';

import {ErrorType} from '../../types';
import {useForm} from '../../hooks/useForm/useForm';

const initialState = [
  {name: 'email', rule: 'isEmail'},
  {name: 'password', rule: 'isPassword'},
];

export const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  //
  const {values, errors, isValid, handleChange, reset} = useForm(initialState);

  const [logUser, {isSuccess, isError, error}] = useLogUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const {email, password} = values;
      await logUser({email, password}).unwrap();

      navigate('/');
    } catch (error: unknown) {
      const err = error as ErrorType;
      /* const {
        data: {message},
      } = error; */
      //console.log('aysnc error', err.data.message);
      console.log('aysnc error', err);
      err.error ? setErrorMessage(err.error) : setErrorMessage(err.data.message);
    }
  };

  return (
    <>
      {isError && <div className="fixed w-full text-center top-[150px]">{errorMessage}</div>}
      <div className="h-screen bg-white flex items-center bg-slate-100">
        <div className="mx-auto my-10 bg-white py-4 px-10 rounded-xl shadow shadow-slate-300 md:w-[400px] w-[80%]">
          <h1 className="text-4xl font-medium text-center mt-4">Login</h1>

          <form action="" className="my-4">
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-md text-slate-700 pb-2">Email address</p>

                <input
                  id="email"
                  placeholder="Enter email address"
                  type="text"
                  name="email"
                  value={values.email}
                  data-rule="isEmail"
                  onChange={handleChange}
                  onBlur={handleChange}
                  className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                />
                {errors.email && (
                  <p role="email-message" className="w-full px-2 mt-2 text-pink-600 text-sm">
                    {errors.email}
                  </p>
                )}
              </label>
              <label htmlFor="password">
                <p className="font-medium text-md text-slate-700 pb-2">Password</p>
                <input
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  role="password"
                  value={values.password}
                  data-rule="isPassword"
                  onChange={handleChange}
                  onBlur={handleChange}
                  className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                />

                {errors.password && (
                  <p role="pwd-message" className="w-full px-2 mt-2 text-pink-600 text-sm">
                    {errors.password}
                  </p>
                )}
              </label>
              <div className="flex flex-row justify-between">
                <div>
                  <a href="#" className="font-light text-indigo-600 text-sm">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center disabled:opacity-50"
              >
                <span>Login</span>
                <FiLogIn />
              </button>
              <p className="text-center">
                Not registered yet?{' '}
                <a
                  href="#"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Register now </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
