import {lazy, suspence, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import '@styles/index.css';
import {Loading} from '../components/loading';
import {Home} from '../pages';
// pages
const Login = lazy(() => import('@pages/login'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
