import {
  createSignal,
  onMount
} from "solid-js";

export function App() {
  const [container, setContainer] = createSignal(null);
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);

  const handleClick = (node: any) => {
    console.log(node);
    setContainer(node);
  }

  const handleDouble = () => {
    console.log(container())
  }

  return (
    <div>
      <button type="button" onClick={increment}>
        {count()}
      </button>
      <button type="button" onClick={handleDouble}>
        CONTAINER
      </button>
      <div ref={handleClick}>CONTAINER</div>
    </div>
  );
}