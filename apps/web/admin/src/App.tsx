import { sum } from '@jnsia/utils';
import './App.css';

function App() {
  const days = sum([13, 22, 4]);

  return (
    <>
      <p>{days}</p>
    </>
  );
}

export default App;
