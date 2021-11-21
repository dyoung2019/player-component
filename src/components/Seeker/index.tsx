import { classify } from "./style";

export default function() {
  return (
    <input
      class={classify()}
      type="range"
      min="0"
      step="1"
      max="100"
    />
  );
}