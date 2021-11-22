import { default as lottie } from 'lottie-web';
import type { AnimationConfigWithData, AnimationItem } from "lottie-web";
import { fetchPath } from "./fetchPath";

export default async function createAnimation(
  container: HTMLElement,
  src: string
): Promise<AnimationItem> {
  // Load the resource information
  return fetchPath(src)
    .then(data => {
      const options: AnimationConfigWithData = {
        container: container,
        loop: false,
        autoplay: false,
        renderer: 'svg',
        rendererSettings: {
          // scaleMode: 'noScale',
          // clearCanvas: false,
          progressiveLoad: true,
          hideOnTransparent: true,
        },
        animationData: data
      };

      return lottie.loadAnimation(options);
    })
}