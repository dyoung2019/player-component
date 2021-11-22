export default function setupHoverEffect(
  container: HTMLElement,
  onHoverOn: () => void,
  onHoverOff: () => void
) {
  // Set handlers to auto play animation on hover if enabled
  container.addEventListener('mouseenter', () => {
    // if (hover() && currentState() !== PlayerState.Playing) {
    //   play();
    // }

    onHoverOn();
  });

  container.addEventListener('mouseleave', () => {
    // if (hover() && currentState() === PlayerState.Playing) {
    //   stop();
    // }
    onHoverOff();
  });
}