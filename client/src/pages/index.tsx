import {useNavigation, Outlet} from 'react-router-dom';
import {useAuth} from '@hooks/useAuth';
import {SideBar} from '@layouts/side-bar';

const Index = () => {
  const navigation = useNavigation();
  return (
    <div
      className="wrapper flex w-full min-h-screen bg-white border "
      style={{background: 'beige'}}
    >
      <SideBar />
      <main
        // className="main w-full border p-4"
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Index;
