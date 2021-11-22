import type { AnimationItem } from "lottie-web";

export default function onVideoCompleted(
  animation: AnimationItem,
  onCompleted: (a: AnimationItem) => void
) {
  // Handle animation play complete
  animation.addEventListener('complete', () => {
    onCompleted(animation)
    // if (currentState() !== PlayerState.Playing) {
    //   // this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));
    //   return;
    // }

    // if (!loop() || (count() && counter() >= count())) {
    //   // this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));
    //   return;
    // }

    // if (mode() === PlayMode.Bounce) {
    //   if (count()) {
    //     setCounter(counter() + 0.5);
    //   }

    //   setTimeout(() => {
    //     // this.dispatchEvent(new CustomEvent(PlayerEvents.Loop));

    //     if (currentState() === PlayerState.Playing) {
    //       inst().setDirection(inst().playDirection * -1);
    //       inst().play();
    //     }
    //   }, intermission());
    // } else {
    //   if (count()) {
    //     this._counter += 1;
    //   }

    //   window.setTimeout(() => {
    //     // this.dispatchEvent(new CustomEvent(PlayerEvents.Loop));

    //     if (currentState() === PlayerState.Playing) {
    //       inst().stop();
    //       inst().play();
    //     }
    //   }, intermission());
    // }
  });
}