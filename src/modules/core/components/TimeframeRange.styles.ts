import * as stylex from '@stylexjs/stylex';
import { colors } from '../design-system/ui.tokens.stylex';

export const styles = stylex.create({
  timeframeItem: {
    cursor: 'pointer',
    margin: '0px',
    outline: 'none',
    border: 'none',
    padding: '0px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: {
      default: 'transparent',
      ":is([data-state='on'])": colors.timeframeBackground,
    },
    color: {
      default: colors.timeframeText,
      ":is([data-state='on'])": colors.timeframeActiveText,
    },
    transition: 'background-color 0.15s',
  },
  timeframe: {
    transition: 'color 0.15s',
  },
});
