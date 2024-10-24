import * as stylex from '@stylexjs/stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

export const styles = stylex.create({
  badge: {
    backgroundColor: colors.tradingDialogBadge,
    borderRadius: 'var(--radius-full)',
  },
});
