import { PlayerState } from "./PlayerState";
import { animationStyle, errorStyle } from "./index.css.ts";
import { mergeProps, Show } from "solid-js";

const customize = (bg: any) => {
  return `background: ${bg}`
}

export default function (props: {
  background: any,
  currentState: PlayerState
}) {
  props = mergeProps({
    background: 'transparent', 
    currentState: PlayerState.Error
  }, props);

  return (
    <div class={animationStyle} style={customize(props.background)}>
      dfdf
      <Show when={props.currentState === PlayerState.Error}>
        <div class={errorStyle}>⚠</div>
      </Show>
    </div>
  );
}