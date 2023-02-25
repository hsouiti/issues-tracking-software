import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

import '@styles/index.css';

import {Loading} from '@components/loading';
// pages
const Dashboard = lazy(() => import('@pages/dashboard'));
const Index = lazy(() => import('@pages/index'));
const Users = lazy(() => import('@pages/users'));
const Projects = lazy(() => import('@pages/projects'));
const Issues = lazy(() => import('@pages/issues'));
const ErrorPage = lazy(() => import('@pages/error-page'));
const Register = lazy(() => import('@pages/register'));
const RequireAuth = lazy(() => import('@pages/requireAuth'));
const Login = lazy(() => import('@pages/login'));

//import {Example} from '@hooks/useFormy/example';

const Router = () => {
  return (
    <Routes>
      <Route
        path="/test"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Index />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />

        <Route
          path="projects"
          element={
            <Suspense fallback={<Loading />}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="issues"
          element={
            <Suspense fallback={<Loading />}>
              <Issues />
            </Suspense>
          }
        />
        <Route
          path="users"
          element={
            <Suspense fallback={<Loading />}>
              <Users />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <ErrorPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
