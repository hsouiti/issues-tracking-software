import {lazy, suspence} from 'react';

import '@styles/index.css';

// pages
const Login = lazy(() => import('@pages/login'));

const Router = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default Router;
