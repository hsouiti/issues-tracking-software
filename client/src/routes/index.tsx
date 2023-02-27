import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';

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
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'projects',
            element: <Projects />,
            /* loader: () => {
              throw new Response('Bad Request', {
                statusText: 'message error',
                status: 400,
              });
            }, */
          },
          {
            path: 'issues',
            element: <Issues />,
          },
          {
            path: 'users',
            element: <Users />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
]);

function Router() {
  return <RouterProvider router={routes} fallbackElement={<Loading />} />;
}

export default Router;
