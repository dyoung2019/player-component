import { vars } from '../Player/index.css.ts';
import { style } from '@vanilla-extract/css';

export const buttonStyle = style({
  cursor: 'pointer',
  fill: vars.toolbar.icon.color,
  display: 'flex',
  background: 'none',
  border: 0,
  padding: 0,
  outline: 'none',
  height: '100%',
  alignItems: 'center',
  ':hover': {
    fill: vars.toolbar.icon.hover,
  },  
});

export const activeStyle = style(
  [
    buttonStyle,
    // customized
    {
      fill: vars.toolbar.icon.active,
    }
  ]
);