import * as stylex from '@stylexjs/stylex';
import { colors } from '../ui.tokens.stylex';

export const styles = stylex.create({
  error: {
    outline: `1px solid ${colors.tradingInputError} !important`,
    outlineOffset: '-1px',
  },
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
