import './index.css';
import logoPNG from '@assets/react.svg';
import Test from '@layouts/Test';

function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <img src={logoPNG} alt="" />
      Hello world!
      <Test />
    </h1>
  );
}

export default App;
