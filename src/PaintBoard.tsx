import { onMount, untrack, createEffect, createSignal, on } from "solid-js"

const Container = (props: any) => {
  return (
    <p ref={props.ref}></p>
  )
}


export default function (props: any) {
  const [a, setA] = createSignal(1);

  let b: HTMLElement;
  createEffect(on(a, () => {
    console.log('REPEAT', a());
  }));

  const handleA = () => {
    setA(a() * 2);
  }

  const handleB = () => {
    b.textContent =`value: ${a()}`
  }

  return (
    <div>
      <p>HELLO WORLD {a()}</p>
      <Container ref={b}>haha</Container>
      <button onclick={handleA}>DOUBLE A</button>
      <button onclick={handleB}>DOUBLE B</button>
    </div>
  )
} 