import * as stylex from '@stylexjs/stylex';
import { animations } from '../animations.stylex';
import { colors } from '../ui.tokens.stylex';

export const styles = stylex.create({
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    backdropFilter: 'blur(5px)',
  },
  content: {
    position: 'fixed',
    top: '100%',
    left: '0',
    right: '0',
    zIndex: '1',
    paddingBottom: 'var(--space-4)',
    overflow: 'auto',
    borderRadius: '16px 16px 0px 0px',
    backgroundColor: colors.dialogBackground,
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    outline: {
      default: null,
      ':focus': 'none',
    },
  },
  bottomGap: {
    paddingBottom: 'var(--space-5)',
  },
  appear: {
    animationName: animations.appear,
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
  hide: {
    animationName: animations.hide,
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
});
