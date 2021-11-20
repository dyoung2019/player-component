import { style, createTheme } from '@vanilla-extract/css';

export const [playerTheme, vars] = createTheme({
  toolbar: {
    background: 'transparent',
    height: '35px',
    icon: {
      color: '#999',
      hover: '#222',
      active: '#555',
    }
  },
});

export const mainStyle = style({
  display: 'grid',
  gridAutoColumns: 'auto',
  gridTemplateRows: 'auto',
  height: 'inherit',
  width: 'inherit'
});

export const controlsStyle = style([
  mainStyle,
  {
    gridTemplateRows: `1fr ${vars.toolbar.height}`,
  }]
);

export const animationStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'inherit',
  height: 'inherit'
});

export const errorStyle = style({
  display: 'flex',
  justifyContent: 'center',
  height: "100%",
  alignItems: 'center',
});