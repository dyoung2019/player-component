import { buttonStyle, activeStyle } from "./index.css.ts"

export function classify(isActive: boolean) {
  return isActive ? activeStyle : buttonStyle;
}