import { mergeProps } from "solid-js";
import { classify } from "./style";
import ToolbarButton from "../ToolbarButton";
import { Stop, Loop, Pause, Play } from './Icons';

export default function (props: any) {
  props = mergeProps({
    isPlaying: true,
    isPaused: false,
    isStopped: true,
    loop: false,
  }, props)

  const togglePlay = () => {
    console.log(props.isPlaying, props.isPaused)
  }

  return (
    <div class={classify()}>
      <ToolbarButton 
        onClicked={togglePlay}
        active={props.isPlaying || props.isPaused}
      >
        {props.isPlaying ? <Play /> : <Pause />}
      </ToolbarButton>
      <ToolbarButton 
        onClicked={togglePlay}
        active={props.isStopped}>
        <Stop />
      </ToolbarButton>
      <input
        class="seeker"
        type="range"
        min="0"
        step="1"
        max="100"
        value={props.seeker}
      />
      <ToolbarButton 
        onClicked={togglePlay}
        active={props.loop}>
        <Loop />
      </ToolbarButton>
    </div>
  );
}