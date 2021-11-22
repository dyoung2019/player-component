import type { AnimationItem } from "lottie-web";
import createAnimation from "./createAnimation";
import setupHoverEffect from "./setupHoverEffect";
import setupVideoEvents from "./setupVideoEvents";

const onVideoSuccess = (a: AnimationItem) => {
  // // Set initial playback speed and direction
  // setSpeed(speed);
  // setDirection(direction);

  // // Start playing if autoplay is enabled
  // if (autoplay) {
  //   play();
  // }
}

export default async function load(
  container: HTMLElement,
  src: string,
  onVideoProgress: (a: AnimationItem, percent: number) => void,
  onVideoCompleted: (a: AnimationItem) => void,
  onVideoReady: () => void,
  onVideoError: (err: any) => void,
  onHoverOn: () => void,
  onHoverOff: () => void,
  onSuccess: (a: AnimationItem) => void,
  onError: (err: any) => void
) {
  // Load the resource information
  return createAnimation(container, src)
    .then(animation => {
      setupVideoEvents(
        animation,
        onVideoProgress,
        onVideoCompleted,
        onVideoReady,
        onVideoError
      );

      setupHoverEffect(
        container,
        onHoverOn,
        onHoverOff);

      // onVideoSuccess  
      onSuccess(animation);
    })
    .catch(onError);
}