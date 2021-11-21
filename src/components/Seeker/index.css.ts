import { style } from '@vanilla-extract/css';
import { vars } from '../Player/index.css.ts';

export const seekerStyle = style({
  WebkitAppearance: 'none',
  width: '95%',
  outline: 'none',
  "::-webkit-slider-runnable-track": {
    width: '100%',
    height: '5px',
    cursor: 'pointer',
    background: vars.seeker.colors.track,
    borderRadius: '3px'
  },
  "::-webkit-slider-thumb": {
    height: '15px',
    width: '15px',
    borderRadius: '50%',
    background: vars.seeker.colors.thumb,
    cursor: 'pointer',
    WebkitAppearance: 'none',
    marginTop: '-5px'
  },
  "::-moz-range-track": {
    width: '100%',
    height: '5px',
    cursor: 'pointer',
    background: vars.seeker.colors.track,
    borderRadius: '3px'
  },
  "::-moz-range-thumb": {
    height: '15px',
    width: '15px',
    borderRadius: '50%',
    background: vars.seeker.colors.thumb,
    cursor: 'pointer',
  },
  "::-ms-track": {
    width: '100%',
    height: '5px',
    cursor: 'pointer',
    background: 'transparent',
    borderColor: 'transparent',
    color: 'transparent',
  },
  "::-ms-fill-lower": {
    background: vars.seeker.colors.track,
    borderRadius: '3px',
  },
  "::-ms-fill-upper": {
    background: vars.seeker.colors.track,
    borderRadius: '3px',
  },
  "::-ms-thumb":{
    border: 0,
    height: '15px',
    width: '15px',
    borderRadius: '50%',
    background: vars.seeker.colors.thumb,
    cursor: 'pointer'
  },
});