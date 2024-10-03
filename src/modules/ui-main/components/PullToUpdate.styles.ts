import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  content: {
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  transition: {
    transition: 'translate 0.5s',
  },
  translate: (x: number) => ({ translate: `0 ${x}px` }),
});
