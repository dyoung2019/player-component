import DotLottiePlayer from "./components/Player";
import PlayerError from "./components/Player/PlayerError";
import { PlayerState } from "./components/Player/PlayerState";

export function App() {
  return (
    <DotLottiePlayer 
      background="red" 
      controls={true} 
      currentState={PlayerState.Error} 
    />
  );
}