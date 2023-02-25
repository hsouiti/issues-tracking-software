import {lazy, Suspense} from 'react';
import {BrowserRouter, createBrowserRouter, RouterProvider} from 'react-router-dom';

import '@styles/index.css';
// pages
/* 
import Dashboard from '@pages/dashboard';
import Index from '@pages/index';
import Users from '@pages/users';
import Projects from '@pages/projects';
import Issues from '@pages/issues';
import ErrorPage from '@pages/error-page';
import Login from '@pages/login';
import Register from '@pages/register';
import RequireAuth from '@pages/requireAuth'; */

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

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <RequireAuth>
          <Index />
        </RequireAuth>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <h1>Error</h1>,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: 'projects',
            element: (
              <Suspense fallback={<Loading />}>
                <Projects />
              </Suspense>
            ),
          },
          {
            path: 'issues',
            element: (
              <Suspense fallback={<Loading />}>
                <Issues />
              </Suspense>
            ),
          },
          {
            path: 'users',
            element: (
              <Suspense fallback={<Loading />}>
                <Users />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />,
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    ),
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
