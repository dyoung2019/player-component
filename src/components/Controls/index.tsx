import { createSignal, onMount } from "solid-js";
import { classify } from "./style";
import ToolbarButton from "../ToolbarButton";
import Seeker from "../Seeker";
import { Stop, Loop, Pause, Play } from './Icons';
import { PlayerState } from "../Player/PlayerState";

export default function () {

  const [instance, setInstance] = createSignal(null);
  const [prevState, setPrevState] = createSignal(null);
  const [currentState, setCurrentState] = createSignal(null);
  const [seeker, setSeeker] = createSignal<number>(0);
  const [counter, setCounter] = createSignal(0);
  const [loop, setLoop] = createSignal(false);

  const load = () => {
    
  }

  onMount(() => {
    setCurrentState(PlayerState.Loading);
  })

  const isPlaying = () => {
    return currentState() === PlayerState.Playing;
  }

  const isPaused = () => {
    return currentState() === PlayerState.Paused;
  }

  const pause = () => {
    const inst = instance();

    if (!inst) {
      return;
    }

    inst.pause();
    setCurrentState(PlayerState.Paused);
    //this.dispatchEvent(new CustomEvent(PlayerEvents.Pause));
  }

  const play = () => {
    const inst = instance();

    if (!inst) {
      return;
    }

    inst.play();
    setCurrentState(PlayerState.Playing);
  }

  const togglePlay = () => {
    return currentState() === PlayerState.Playing ? pause() : play();
  }

  const stop = () => {
    const inst = instance();

    if (!inst) {
      return;
    }

    setCounter(0);
    inst.stop();
    setCurrentState(PlayerState.Stopped);
  }

  const setLooping = (value: boolean) => {
    const inst = instance();

    if (!inst) {
      return;
    }

    if (inst) {
      setLoop(value);
      inst.loop = value;
    }
  }

  const toggleLooping = () => {
    setLooping(!loop());
  }

  const isStopped = () => {
    return currentState() === PlayerState.Stopped;
  }

  const getNoOfFrames = (): number => {
    const inst = instance();

    if (!inst) {
      return 0;
    }

    return inst.totalFrames;
  }

  /**
   * Seek to a given frame.
   */
  const seek = (value: number | string) => {
    const inst = instance();

    if (!inst) {
      return;
    }

    // Extract frame number from either number or percentage value
    const matches = value.toString().match(/^([0-9]+)(%?)$/);
    if (!matches) {
      return;
    }

    // Calculate and set the frame number
    const frame: number = matches[2] === '%'
      ? (getNoOfFrames() * Number(matches[1])) / 100
      : Number(matches[1]);

    // Set seeker to new frame number
    setSeeker(frame);

    // Send lottie player to the new frame
    if (isPlaying()) {
      inst.goToAndPlay(frame, true);
    } else {
      inst.goToAndStop(frame, true);
      inst.pause();
    }
  }

  /**
   * Freeze animation play.
   * This internal state pauses animation and is used to differentiate between
   * user requested pauses and component instigated pauses.
   */
  const freeze = () => {
    const inst = instance();

    if (!inst) {
      return;
    }

    inst.pause();
    setCurrentState(PlayerState.Frozen);

    // this.dispatchEvent(new CustomEvent(PlayerEvents.Freeze));
  }

  const handleOnPressed = () => {
    setPrevState(currentState());
    freeze();
  }

  const handleOnReleased = () => {
    if (prevState() === PlayerState.Playing) {
      play();
    }
  }

  const handleSeeker = (value: number | string) => {
    seek(value);
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
        onClicked={stop}
        active={isStopped()}>
        <Stop />
      </ToolbarButton>
      <Seeker
        value={seeker()}
        noOfFrames={getNoOfFrames()}
        onValueChanged={handleSeeker}
        onPressed={handleOnPressed}
        onReleased={handleOnReleased}
      />
      <ToolbarButton
        onClicked={toggleLooping}
        active={loop()}>
        <Loop />
      </ToolbarButton>
    </div>
  );
}