import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  hideScroll: {
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  transition: {
    transition: 'translate 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)',
  },
});
