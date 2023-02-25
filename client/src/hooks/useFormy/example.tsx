import React, {useEffect, useState, useRef} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import {FiLogIn, FiEye, FiEyeOff} from 'react-icons/fi';
import {BiLinkExternal, BiCheck} from 'react-icons/bi';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ErrorType} from '@interfaces/index';
import {useLogUserMutation} from '@features/auth/api/authApi';
import {useToastMessage} from '@hooks/useToastMessage';
import {useForm} from '@hooks/useForm/useForm';

import InputField from '@components/oooinput-field';
import {useFormy} from './useFormy';

const initialState = {
  nametest: '',
  emailtest: '',
};

export const Example = () => {
  //
  const {values, errors, isValid, onChange, onSubmit, useField, resetField} = useFormy(
    initialState,
    handleSubmit
  );

  function handleSubmit() {
    console.log(values);
    return new Promise((resolve) => console.log('here'));
  }

  return (
    <div className="h-screen bg-white flex items-center bg-slate-100">
      <div className="mx-auto my-10 bg-white py-4 px-10 rounded-xl shadow shadow-slate-300 md:w-[400px] w-[80%]">
        <h1 className="text-3xl font-medium text-center my-4 mb-8">Test</h1>
        <form action="" className="my-4" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-5">
            <input
              {...useField({
                name: 'firstName',
                placeholder: 'your name',
                validate: {required: true, maxLength: 30},
              })}
            />

            <input
              {...useField({
                label: 'Email Address',
                name: 'email',
                placeholder: 'Enter your email',
                type: 'email',
                validate: {required: true, maxLength: 30},
              })}
            />

            <input
              type="text"
              {...{required: true, min: 8}}
              onChange={onChange}
              name="nametest"
              value={values.nametest}
              placeholder="placeholder"
            />

            <input
              type="email"
              onChange={onChange}
              name="emailtest"
              value={values.emailtest}
              placeholder="placeholder"
              {...{required: true /* pattern: /^([w-.]+@([w-]+.)+[w-]{2,4})?$/ */}}
            />

            {/* <InputField
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
 */}
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
          </div>
        </form>
      </div>
    </div>
  );
};
