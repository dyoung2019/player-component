import { createSignal, mergeProps, onMount, Show } from "solid-js";
import DotLottieControls from "../Controls";
import { PlayMode } from "./PlayMode";
import PlayerError from './PlayerError';
import { classify, customize } from "./style";
import LottieContainer from "../LottieContainer";
import load from "./load";
import type { AnimationItem } from "lottie-web";
import { PlayerState } from "./PlayerState";

export default function (props: any) {
  props = mergeProps({
    controls: false,
    currentState: PlayerState.Loading,
    mode: PlayMode.Normal,
    setCurrentState: (state: PlayerState) => { },
    background: 'transparent',
    speed: 1,
    direction: 1,
    autoplay: false,
    onVideoReady: () => { },
    onVideoError: () => { }
  }, props);

  const { appTheme, appClass } = classify(props.controls);
  // ref to lottie container element
  let container;

  // >> refactor to hooks 
  const [seeker, setSeeker] = createSignal(0);

  const getNoOfFrames = (): number => {
    if (!animation) {
      return 0;
    }

    return animation.totalFrames;
  }

  const isPlaying = () => {
    return props.currentState === PlayerState.Playing;
  }

  /**
   * Seek to a given frame.
   */
  const seek = (value: number | string) => {
    if (!animation) {
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
      animation.goToAndPlay(frame, true);
    } else {
      animation.goToAndStop(frame, true);
      animation.pause();
    }
  }

  const onVideoProgress = (anim: AnimationItem, progress: number) => {
    setSeeker(progress);
  }

  /**
   * Whether to loop animation.
   */
  const [loop, setLoop] = createSignal(false);

  /**
   * Number of times to loop animation.
   */
  const [count, setCount] = createSignal(null);

  /**
   * Number of times the animation has completed the animation.
   */
  const [counter, setCounter] = createSignal(0);

  /**
   * i.e. The delay when the player will restart the animation.
   */
  const [intermission, setIntermission] = createSignal(1);

  const onVideoCompleted = () => {
    if (props.currentState !== PlayerState.Playing) {
      // this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));
      return;
    }

    if (!loop() || (count() && counter() >= count())) {
      // this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));
      return;
    }

    if (props.mode === PlayMode.Bounce) {
      if (count()) {
        setCounter(counter() + 0.5);
      }

      setTimeout(() => {
        // this.dispatchEvent(new CustomEvent(PlayerEvents.Loop));

        if (props.currentState === PlayerState.Playing) {
          const toggle = animation.playDirection === -1
            ? 1
            : -1;
          animation.setDirection(toggle);
          play();
        }
      }, intermission());
    } else {
      if (count()) {
        setCounter(counter() + 1);
      }

      window.setTimeout(() => {
        // this.dispatchEvent(new CustomEvent(PlayerEvents.Loop));

        if (props.currentState === PlayerState.Playing) {
          stop();
          play();
        }
      }, intermission());
    }
  }

  // ref to lottie animation object
  let animation: AnimationItem = null;
  const play = () => {
    if (!animation) {
      return;
    }

    animation.play();
    props.setCurrentState(PlayerState.Playing);
  }

  const stop = () => {
    if (!animation) {
      return;
    }

    setCounter(0);
    animation.stop();
    props.setCurrentState(PlayerState.Stopped);
  }

  const pause = () => {
    if (!animation) {
      return;
    }

    animation.pause();
    props.setCurrentState(PlayerState.Paused);
    //this.dispatchEvent(new CustomEvent(PlayerEvents.Pause));
  }

  const setSpeed = (value: any) => {
    if (!animation) {
      return;
    }
    animation.setSpeed(value);
  }

  const setDirection = (value: 1 | -1) => {
    if (!animation) {
      return;
    }
    animation.setDirection(value);
  }

  const onSuccess = (a: AnimationItem) => {
    animation = a;

    // // Set initial playback speed and direction
    setSpeed(props.speed);
    setDirection(props.direction);

    // // Start playing if autoplay is enabled
    if (props.autoplay) {
      play();
    }
  }

  const onError = () => {
    props.setCurrentState(PlayerState.Error);
  }

  /**
   * Freeze animation play.
   * This internal state pauses animation and is used to differentiate between
   * user requested pauses and component instigated pauses.
   */
   const freeze = () => {
    if (!animation) {
      return;
    }

    animation.pause();
    props.setCurrentState(PlayerState.Frozen);

    // this.dispatchEvent(new CustomEvent(PlayerEvents.Freeze));
  }

  const [hover, setHover] = createSignal(false);
  const onHoverOn = () => {
    if (hover() && props.currentState !== PlayerState.Playing) {
      play();
    }
  }

  const onHoverOff = () => {
    if (hover() && props.currentState === PlayerState.Playing) {
      stop();
    }
  }

  onMount(async () => {
    load(
      container,
      'sample_dotlottie.lottie',
      onVideoProgress,
      onVideoCompleted,
      props.onVideoReady,
      props.onVideoError,
      onHoverOn,
      onHoverOff,
      onSuccess,
      onError
    );
  })

  const setLooping = (value: boolean) => {
    if (!animation) {
      return;
    }

    setLoop(value);
    animation.loop = value;
  }

  const [prevState, setPrevState] = createSignal(null);
  const handleOnDown = () => {
    setPrevState(props.currentState);
    freeze();
  }  

  const handleOnUp = () => {
    if (prevState() === PlayerState.Playing) {
      play();
    }
  }

  return (
    <div class={appTheme} >
      <div class={appClass} style={customize(props.background)}>
        <LottieContainer ref={container} />
        <PlayerError
          background={props.background}
          currentState={props.currentState}
        />
        <Show when={props.controls}>
          <DotLottieControls
            currentState={props.currentState}
            seeker={seeker()}
            noOfFrames={getNoOfFrames()}
            looping={loop()}
            setLooping={setLooping}
            onPlay={play}
            onPause={pause}
            onStop={stop}
            onSeek={seek}
            onHoverOn={handleOnDown}
            onHoverOff={handleOnUp}
          />
        </Show>
      </div>
    </div>
  );
}