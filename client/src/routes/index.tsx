import {lazy, Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import '@styles/index.css';

// Loading
import {Loading} from '@components/loading';
// pages

import Dashboard from '@pages/dashboard';
import Index from '@pages/index';
import Users from '@pages/users';
import Projects from '@pages/projects';
import Issues from '@pages/issues';
import ErrorPage from '@pages/error-page';
import Register from '@pages/register';
import RequireAuth from '@pages/requireAuth';
import Login from '@pages/login';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Index />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <h1>Error</h1>,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'projects',
            element: <Projects />,
            /*  loader: (data) => console.log('laoder data ', data), */
          },
          {
            path: 'issues',
            element: <Issues />,
            loader: (data) => console.log('laoder data ', data),
          },
          {
            path: 'users',
            element: <Users />,
            loader: (data) => console.log('laoder data ', data),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
