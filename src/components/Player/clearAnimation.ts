import type { AnimationItem } from "lottie-web";

export default function clearAnimation(anim: AnimationItem) {
  // Clear previous animation, if any
  if (anim) {
    anim.destroy();
  }
}