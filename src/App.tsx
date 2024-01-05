import { createSignal } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <div test-id="App" class="container mx-auto">
        <div class="flex flex-col justify-center items-center mt-10">
          <a class="py-4" href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} class="w-14 h-14" alt="Vite logo" />
          </a>
          <a class="py-4" href="https://solidjs.com" target="_blank">
            <img src={solidLogo} class="w-14 h-14" alt="Solid logo" />
          </a>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-3xl font-bold my-5">Vite + Solid</h1>
        <button
          class="g-blue-500 bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count()}
        </button>
      </div>
    </>
  );
}

export default App;
