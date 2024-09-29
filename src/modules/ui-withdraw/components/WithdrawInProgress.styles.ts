import * as stylex from '@stylexjs/stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

export const styles = stylex.create({
  violetWrapper: {
    borderRadius: 'var(--radius-full)',
    backgroundColor: colors.violetBackground,
  },
});
