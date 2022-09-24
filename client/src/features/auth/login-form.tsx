/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {ErrorType} from '../../types';

import {useLogUserMutation} from './api/authApi';
import {getCurrentUser} from './service/authSlice';
//import {setUser} from './service/authSlice';

const initialState = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const currentUser = useSelector(getCurrentUser);
  console.log('curre', currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const [logUser, {isError, error: fetchError}] = useLogUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
  };

  const signIn = async () => {
    try {
      const {email, password} = values;
      const user = await logUser({email, password}).unwrap();
      //setUser(user);

      navigate('/');
    } catch (error: unknown) {
      const err = error as ErrorType;
      //console.log('aysnc error', err.data.message);
      console.log('aysnc error', err);
    }
  };

  useEffect(() => {
    if (isError) console.log('fetcherror', fetchError);
  }, [isError]);

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
