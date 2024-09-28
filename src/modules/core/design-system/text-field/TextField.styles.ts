import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  clear: {
    transition: 'opacity 0.15s',
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none',
  },
  show: {
    opacity: 1,
  },
});
