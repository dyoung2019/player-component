import type { AnimationItem } from "lottie-web";

export default function onVideoReady(
  animation: AnimationItem,
  onReady: () => void
) {
  // Handle lottie-web ready event
  animation.addEventListener('DOMLoaded', () => {
    //this.dispatchEvent(new CustomEvent(PlayerEvents.Ready));
    onReady();
  });
}