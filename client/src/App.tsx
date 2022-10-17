import {lazy, Suspense} from 'react';
import '@styles/index.css';
import {Loading} from './components/loading';
import {BrowserRouter} from 'react-router-dom';
//const Router = lazy(() => import('./routes'));
const Router = lazy(() => import('./routes/router'));

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
