import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  hideScroll: {
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  longTransition: {
    transition: 'translate 0.5s cubic-bezier(0.25, 0.8, 0.5, 1)',
  },
  shortTransition: {
    transition: 'translate 0.02s linear',
  },
  tabContent: {
    width: '100%',
  },
  translate: (x: number) => ({ translate: `-${x}px` }),
});
