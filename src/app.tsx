import { createSignal } from "solid-js";
import DotLottiePlayer from "./components/Player";
import { PlayerState } from "./components/Player/PlayerState";

export function App() {
  const [currentState, setCurrentState] = createSignal(PlayerState.Loading);

  return (
    <DotLottiePlayer 
      background="red" 
      controls={true} 
      currentState={currentState()}
      setCurrentState={setCurrentState} 
    />
  );
}