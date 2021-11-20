import { assignInlineVars } from '@vanilla-extract/dynamic';
import { playerTheme, vars, mainStyle, controlsStyle } from "./index.css.ts";

export function customize(bg: any) {
  return assignInlineVars({
    [vars.toolbar.background]: bg
  })
}

export function classify(hasControls: boolean) {
  return {
    appTheme: playerTheme,
    appClass: hasControls ? mainStyle : controlsStyle
  }
}