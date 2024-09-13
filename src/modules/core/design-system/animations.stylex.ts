import * as stylex from '@stylexjs/stylex';

const appear = stylex.keyframes({
  '0%': { translate: '0 0' },
  '100%': { translate: '0 -100%' },
});

const reverseAppear = stylex.keyframes({
  '0%': { translate: '0 0' },
  '100%': { translate: '0 100%' },
});

const hide = stylex.keyframes({
  '0%': { translate: '0 -100%' },
  '100%': { translate: '0 20px' },
});

export const animations = stylex.defineVars({
  appear,
  reverseAppear,
  hide,
});
