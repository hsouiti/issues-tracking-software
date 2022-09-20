import {lazy, Suspense} from 'react';
import '@styles/index.css';
const Router = lazy(() => import('./routes'));

const App = () => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Router />
    </Suspense>
  );
};

export default App;
