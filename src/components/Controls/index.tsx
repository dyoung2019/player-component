import { createSignal, mergeProps, onMount } from "solid-js";
import { classify } from "./style";
import ToolbarButton from "../ToolbarButton";
import Seeker from "../Seeker";
import { Stop, Loop, Pause, Play } from './Icons';
import { PlayerState } from "../Player/PlayerState";

export default function (props: any) {
  props = mergeProps({ 
    seeker: 0,
    noOfFrames: 0,
    onPlay: () => {},
    onPause: () => {},
    onStop: () => {},
    onHoverOn: () => {},
    onHoverOff: () => {},
    onSeek: (v:number|string) => {},
    looping: false,
    setLooping: (v:boolean) => {}
   }, props);

  const isPlaying = () => {
    return props.currentState === PlayerState.Playing;
  }

  const isPaused = () => {
    return props.currentState === PlayerState.Paused;
  }

  const togglePlay = () => {
    if (props.currentState === PlayerState.Playing) {
      props.onPause();
    } else {
      props.onPlay();
    }
  }

  const toggleLooping = () => {
    props.setLooping(!props.looping);
  }

  const isStopped = () => {
    return props.currentState === PlayerState.Stopped;
  }
  
  const handleOnPressed = () => {
    // setPrevState(props.currentState);
    // freeze();
    props.onHoverOn();
  }

  const handleOnReleased = () => {
    // if (prevState() === PlayerState.Playing) {
    //   props.onPlay();
    // }
    props.onHoverOff();
  }

  const handleSeeker = (value: number | string) => {
    props.onSeek(value);
  }

  return (
    <div class={classify()}>
      <ToolbarButton
        onClicked={togglePlay}
        active={isPlaying() || isPaused()}
      >
        {isPlaying() ? <Play /> : <Pause />}
      </ToolbarButton>
      <ToolbarButton
        onClicked={props.onStop}
        active={isStopped()}>
        <Stop />
      </ToolbarButton>
      <Seeker
        value={props.seeker}
        noOfFrames={props.noOfFrames}
        onValueChanged={handleSeeker}
        onPressed={handleOnPressed}
        onReleased={handleOnReleased}
      />
      <ToolbarButton
        onClicked={toggleLooping}
        active={props.looping}>
        <Loop />
      </ToolbarButton>
    </div>
  );
}