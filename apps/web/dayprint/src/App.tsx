import './App.css';
import { sum } from '@jnsia/utils';

function App() {
  const days = sum([13, 22, 4]);

  return <p>{days}</p>;
}

export default App;
