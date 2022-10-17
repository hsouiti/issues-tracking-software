import React, {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import {useLogUserMutation} from './api/authApi';

import {ErrorType} from '../../types';
import {LoginRequest} from './types';
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
      console.log(error);

      //console.log('aysnc error', err.data.message);
      console.log('aysnc error', err.error);
      setErrorMessage(err.error);
    }
  };

  return (
    <>
      {isError && <div className="fixed w-full text-center top-[150px]">{errorMessage}</div>}
      <div className="h-screen bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center">
        <form className="max-w-[400px] w-full mx-auto bg-white py-16 px-8 border">
          <div className="inputs">
            <div className="mb-6">
              <input
                className="peer appearance-none border rounded-lg w-full py-2.5 px-3 text-grey-darker"
                placeholder="Your Email"
                type="text"
                name="email"
                aria-label="email"
                value={values.email}
                data-rule="isEmail"
                onChange={handleChange}
                onBlur={handleChange}
              />
              {errors.email && (
                <p role="email-message" className="px-2 mt-2 text-pink-600 text-sm">
                  {errors.email}
                </p>
              )}
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
                data-rule="isPassword"
                onChange={handleChange}
                onBlur={handleChange}
              />
              {errors.password && (
                <p role="pwd-message" className="px-2 mt-2 text-pink-600 text-sm">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-dark text-white w-full py-2.5 px-4 rounded cursor-pointer disabled:opacity-25"
              onClick={handleSubmit}
              type="button"
              disabled={!isValid}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
