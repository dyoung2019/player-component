import { classify } from "./style";


export default function(
  props: { 
    active: boolean,
    onClicked: () => void,
    children: any
  }
) {
  return (
    <button onclick={props.onClicked} class={classify(props.active)}>
      {props.children}
    </button>
  )
}
