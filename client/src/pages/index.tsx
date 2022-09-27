import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '@/hooks/useAuth';
import {SideBar} from '@layouts/side-bar';

export const Index = () => {
  const isAuthenticated = true;
  const {user} = useAuth();
  console.log('user', user);

  if (user) {
    return (
      <div className="wrapper flex w-full min-h-screen bg-white border">
        <SideBar />
        <main className="main w-full border p-4">
          <Outlet />
        </main>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};
