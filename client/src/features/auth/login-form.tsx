import React, {useEffect, useState, useRef} from 'react';
import {useNavigate, Link} from 'react-router-dom';
// icons
import {FiLogIn, FiEye, FiEyeOff} from 'react-icons/fi';
import {BiLinkExternal, BiCheck} from 'react-icons/bi';

import 'react-toastify/dist/ReactToastify.css';

// types
import {ErrorType} from '@interfaces/index';

// RTK
import {useLogUserMutation} from './api/authApi';

// custom hooks
import {useToastMessage} from '@hooks/useToastMessage';
import {useForm} from '@hooks/useForm/useForm';

// components
import InputField from '@components/input-field';

const initialState = [
  {name: 'email', rule: 'isEmail'},
  {name: 'password', rule: 'isPassword'},
];

export const LoginForm = () => {
  const navigate = useNavigate();
  //
  const {values, errors, isValid, onChange, onSubmit, resetField} = useForm(
    initialState,
    handleSubmit
  );

  const [logUser] = useLogUserMutation();

  async function handleSubmit(): Promise<void> {
    try {
      const {email, password} = values;
      await logUser({email, password}).unwrap();
      useToastMessage('Sign In succefully', 'success');
      navigate('/');
    } catch (error: unknown) {
      /*       if (error instanceof Error) {
        return error.message;
      }
      return (e as Error).message; */

      const err = error as ErrorType;
      err.error ? useToastMessage(err.error, 'error') : useToastMessage(err.data?.message, 'error');
      resetField('password');
    }
  }

  return (
    <div className="h-screen bg-white flex items-center bg-slate-100">
      <div className="mx-auto my-10 bg-white py-4 px-10 rounded-xl shadow shadow-slate-300 md:w-[400px] w-[80%]">
        <h1 className="text-3xl font-medium text-center my-4 mb-8">Sign In</h1>
        <form action="" className="my-4" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-5">
            <InputField
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={values.email}
              rule="isEmail"
              onChange={onChange}
              error={errors.email ?? null}
            />

            <InputField
              label="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={values.password}
              rule="isPassword"
              role="password"
              onChange={onChange}
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
  );
};
