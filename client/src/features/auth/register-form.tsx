import React, {useEffect, useState} from 'react';

import {Link, useNavigate} from 'react-router-dom';

import {FiLogIn} from 'react-icons/fi';
import {BiLinkExternal} from 'react-icons/bi';

import {useLogUserMutation} from './api/authApi';

import {ErrorType} from '../../types';
import {useForm} from '../../hooks/useForm/useForm';

import InputField from '@components/InputField';

const initialState = [
  {name: 'name', rule: 'isRequired'},
  {name: 'email', rule: 'isEmail'},
  {name: 'password', rule: 'isPassword'},
  {name: 'confirmPassword', rule: 'isConfirmPassword'},
];

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  //
  const {values, errors, isValid, onChange} = useForm(initialState, handleSubmit);

  const [logUser, {isSuccess, isError, error}] = useLogUserMutation();

  async function handleSubmit(): Promise<void> {
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
          <h1 className="text-3xl font-medium text-center my-4 mb-8">Sign Up</h1>

          <form action="" className="my-4">
            <div className="flex flex-col space-y-5">
              <InputField
                label="Full Name"
                name="name"
                placeholder="Enter your Full Name"
                type="text"
                value={values.name}
                rule="isRequired"
                onChange={onChange}
                error={errors.name ?? null}
              />

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
                onChange={onChange}
                error={errors.password ?? null}
              />

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm password"
                type="password"
                value={values.confirmpassword}
                rule="isConfirmPassword"
                onChange={onChange}
                error={errors.confirmPassword ?? null}
              />

              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center disabled:opacity-50"
              >
                <span>Sign Up</span>
                <FiLogIn />
              </button>
              <p className="text-center text-sm">
                Already have an account? {'  '}
                <Link
                  to="/login"
                  className="text-indigo-600 text-sm font-medium inline-flex space-x-1 items-center"
                >
                  <span>Sign In</span>
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
