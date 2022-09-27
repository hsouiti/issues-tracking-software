import {BrowserRouter, createBrowserRouter, RouterProvider} from 'react-router-dom';

import '@styles/index.css';
// pages
import {Loading} from '@/components/loading';
import {Dashboard} from '@/pages/dashboard';
import {Index} from '@/pages';
import {Users} from '@/pages/users';
import {Projects} from '@/pages/projects';
import {Issues} from '@/pages/issues';
import {ErrorPage} from '@/pages/error-page';
import {Login} from '@pages/login';
import {RequireAuth} from '@/pages/requireAuth';

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
      {index: true, element: <Dashboard />},
      {
        path: 'projects',
        element: <Projects />,
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
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Login />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
