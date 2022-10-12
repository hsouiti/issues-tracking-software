import {lazy, Suspense} from 'react';
import '@styles/index.css';
import {Loading} from './components/loading';
const Router = lazy(() => import('./routes'));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router />
    </Suspense>
  );
};

export default App;
