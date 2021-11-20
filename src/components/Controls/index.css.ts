import { vars } from '../Player/index.css.ts';
import { style } from '@vanilla-extract/css';

export const toolbarStyle  = style(
  {
    display: 'grid',
    gridTemplateColumns: '32px 32px 1fr 32px',
    alignItems: 'center',
    justifyItems: 'center',
    backgroundColor: vars.toolbar.backgroundColor,
  },
);

export const buttonStyle = style({
  cursor: 'pointer',
  fill: vars.toolbar.icon.color,
  display: 'flex',
  background: 'none',
  border: 0,
  padding: 0,
  outline: 'none',
  height: '100%',
  ':hover': {
    color: vars.toolbar.icon.hover,
  },  
});

export const activeButtonStyle = style(
  [
    buttonStyle,
    // customized
    {
      fill: vars.toolbar.icon.color,
    }
  ]
);

