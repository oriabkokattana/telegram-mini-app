import * as stylex from '@stylexjs/stylex';
import { animations } from '@/modules/core/design-system/animations.stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

export const styles = stylex.create({
  rotate: {
    translate: '-50% -50%',
    transition: 'rotate 0.3s',
    borderRadius: 'var(--radius-full)',
    border: '3px solid',
    borderColor: colors.tradingRotateBorder,
    backgroundColor: colors.tradingRotateBackground,
    cursor: 'pointer',
    zIndex: '3',
  },
  sample: {
    zIndex: '1',
    backgroundColor: colors.themeBackground,
    display: 'none',
  },
  appear: {
    display: 'block',
    animationName: animations.reverseAppear,
    animationDelay: '0.2s',
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
  percentGroup: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  },
  percent: {
    cursor: 'pointer',
    margin: '0px',
    outline: 'none',
    border: 'none',
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'var(--space-1)',
    padding: 'var(--space-3) var(--space-2)',
    borderRadius: '40px',
    backgroundColor: {
      default: colors.tradingPercentBackground,
      ":is([data-state='on'])": colors.tradingPercentBackgroundActive,
    },
    transition: 'background-color 0.15s',
  },
  compareSavings: {
    transition: 'rotate 0.15s',
  },
  compareSavingsRotate: {
    rotate: '-180deg',
  },
});
