import React, {useEffect, useState} from 'react';
import TextField from '../../components/TextField';
import {useNavigate, Link} from 'react-router-dom';

import {FiLogIn} from 'react-icons/fi';
import {BiLinkExternal, BiCheck} from 'react-icons/bi';

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
  const {values, errors, isValid, handleChange, handleSubmit} = useForm(initialState, submitForm);

  const [logUser, {isSuccess, isError, error}] = useLogUserMutation();

  async function submitForm(): Promise<void> {
    try {
      const {email, password} = values;
      await logUser({email, password}).unwrap();

      navigate('/');
    } catch (error: unknown) {
      const err = error as ErrorType;
      err.error ? setErrorMessage(err.error) : setErrorMessage(err.data?.message);
    }
  }

  return (
    <>
      {isError && <div className="fixed w-full text-center top-[150px]">{errorMessage}</div>}
      <div className="h-screen bg-white flex items-center bg-slate-100">
        <div className="mx-auto my-10 bg-white py-4 px-10 rounded-xl shadow shadow-slate-300 md:w-[400px] w-[80%]">
          <h1 className="text-3xl font-medium text-center my-4 mb-8">Sign In</h1>

          <form action="" className="my-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
              <TextField
                label="Email Address"
                name="email"
                placeholder="Enter email address"
                type="text"
                rule="isEmail"
                value={values.email}
                onChange={handleChange}
                error={errors.email ?? null}
              />

              <TextField
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                rule="isPassword"
                value={values.password}
                onChange={handleChange}
                error={errors.password ?? null}
              />

              <div className="flex flex-row justify-between">
                <div>
                  <a href="#" className="font-bold text-indigo-600 text-sm">
                    Forgot Password ?
                  </a>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center disabled:opacity-50"
              >
                <span>Sign In</span>
                <FiLogIn />
              </button>
              <p className="text-center text-sm">
                Not registered yet?{' '}
                <Link
                  to="/register"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Sign Up now </span>
                  <span>
                    <BiLinkExternal />
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
