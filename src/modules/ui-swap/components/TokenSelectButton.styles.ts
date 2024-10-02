import * as stylex from '@stylexjs/stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

export const styles = stylex.create({
  base: {
    backgroundColor: colors.tradingTokenSelectBackground,
    boxShadow: '0px 0px 10px 0px rgba(34, 34, 34, 0.04)',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
  },
});
