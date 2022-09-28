import {useRef} from 'react';
import {useNavigate, Form} from 'react-router-dom';

import {useLogUserMutation} from './api/authApi';

import {ErrorType} from '../../types';

export const LoginForm = () => {
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const [logUser, {isError, error: fetchError}] = useLogUserMutation();

  const submitForm = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const formData = new FormData(formRef.current);
    //formData.append('email', values.email);
    //formData.append('password', values.password);
    const updates = Object.fromEntries(formData);

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const user = await logUser(updates).unwrap();
      navigate('/');
    } catch (error: unknown) {
      const err = error as ErrorType;
      console.log('aysnc error', err);
    }
    navigate('/');
  };

  return (
    <div>
      <Form className="max-w-[400px] w-full mx-auto bg-white p-8" method="post" ref={formRef}>
        <div className="inputs">
          <div>
            <label>Username</label>
            <input
              type="text"
              className="border"
              name="email"
              aria-label="email"
              /*   value={values.email}
                onChange={handleChange} */
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
              /* value={values.password}
                onChange={handleChange} */
            />
          </div>
        </div>
        <button onClick={submitForm} style={{padding: '10px 20px', border: '1px solid gray'}}>
          Sign In
        </button>
        <button>Cancel </button>
      </Form>
    </div>
  );
};
