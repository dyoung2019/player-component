import type { AnimationItem } from "lottie-web";

export default function onVideoError(
  animation: AnimationItem,
  onError: (err: any) => void
) {
  // Set error state when animation load fail event triggers
  animation.addEventListener('data_failed', (err) => {
    // setCurrentState(PlayerState.Error);
    onError(err);

    //this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
  });
}