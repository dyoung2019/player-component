import type { AnimationItem } from "lottie-web";
import onVideoCompleted from "./onVideoCompleted";
import onVideoError from "./onVideoError";
import onVideoProgress from "./onVideoProgress";
import onVideoReady from "./onVideoReady";

export default function setupVideoEvents(
  animation: AnimationItem,
  onProgress: (a: AnimationItem, percent: number) => void,
  onCompleted: (a: AnimationItem) => void,
  onReady: () => void,
  onError: (err: any) => void
) {
  if (animation) {
    onVideoProgress(animation, onProgress);
    onVideoCompleted(animation, onCompleted);
    onVideoReady(animation, onReady);
    onVideoError(animation, onError);
  }
}