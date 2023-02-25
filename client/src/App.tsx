import {lazy, Suspense} from 'react';
import '@styles/index.css';
import {Loading} from './components/loading';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
//const Router = lazy(() => import('./routes/router'));
const Router = lazy(() => import('./routes'));

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
};

export default App;
