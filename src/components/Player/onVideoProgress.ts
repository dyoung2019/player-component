import type { AnimationItem } from "lottie-web";

export default function onVideoProgress(
  animation: AnimationItem,
  onProgress: (a: AnimationItem, percent: number) => void,
) {
  // const setSeeker = (value: number) => { }

  // Calculate and save the current progress of the animation
  animation.addEventListener('enterFrame', () => {
    const progress = (animation.currentFrame / animation.totalFrames) * 100;
    onProgress(animation, progress);
    // this.dispatchEvent(
    //   new CustomEvent(PlayerEvents.Frame, {
    //     detail: {
    //       frame: inst().currentFrame,
    //       seeker: seeker(),
    //     },
    //   }),
    // );
  });
}