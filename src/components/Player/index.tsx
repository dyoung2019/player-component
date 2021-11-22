import { mergeProps, Show } from "solid-js";
import DotLottieControls from "../Controls";
import { PlayMode } from "./PlayMode";
import PlayerError from './PlayerError';
import { classify, customize } from "./style";

export default function (props: any) {
  props = mergeProps({
    controls: false,
    currentState: PlayMode.Normal,
    background: 'transparent',
  }, props);

  const { appTheme, appClass } = classify(props.controls);

  return (
    <div class={appTheme} >
      <div class={appClass} style={customize(props.background)}>
        <PlayerError
          background={props.background}
          currentState={props.currentState}
        />
        <Show when={props.controls}>
          <DotLottieControls />
        </Show>
      </div>
    </div>
  );
}