import { mergeProps } from "solid-js";
import { classify } from "./style";

export default function(props: {
  value: string | number,
  noOfFrames: number,
  onValueChanged: (v: number | string) => void,
  onPressed: () => void,
  onReleased: () => void
}) {
  props = mergeProps({ 
    value: 0, 
    noOfFrames: 0,
    onValueChanged: (v) => { console.log('onValueChanged', v) },
    onPressed: () => { console.log('onPressed') },
    onReleased: () => { console.log('onReleased') }
  }, props);

  /**
   * Handles click and drag actions on the progress track.
   */
  const handleChange = (e: any) => {
    const target = e.target;
  
    if (!target && isNaN(target.value)) {
      return;
    }

    const frame: number = (Number(target.value) / 100.0) * props.noOfFrames;
    props.onValueChanged(frame);
  }

  return (
    <input
      class={classify()}
      type="range"
      min="0"
      step="1"
      max="100"
      value={props.value}
      onInput={handleChange}
      onMouseDown={props.onPressed}
      onMouseUp={props.onReleased}
    />
  );
}