import * as stylex from '@stylexjs/stylex';
import { colors } from '../design-system/ui.tokens.stylex';

const slide = stylex.keyframes({
  '0%': { translate: '0 0' },
  '100%': { translate: '-100% 0' },
});

export const styles = stylex.create({
  base: {
    border: '1px solid',
    borderColor: colors.homeButtonBorder,
    borderRadius: 'var(--radius-full) 0 0 var(--radius-full)',
    backgroundColor: colors.homeButtonBackground,
    animationName: slide,
    animationDelay: '0.3s',
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
});
