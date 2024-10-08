import { Suspense, useState } from "react";
import "./App.css";
import VueWrapper from "./VueWrapper";
import Header from "./components/common/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <VueWrapper />
      </Suspense>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
