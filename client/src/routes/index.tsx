import {lazy, suspence} from 'react';

import '@styles/index.css';

// pages
const Login = lazy(() => import('@pages/login'));

const Router = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Router</h1>
      <Login />
    </>
  );
};

export default Router;
