import * as stylex from '@stylexjs/stylex';
import { colors } from '../design-system/ui.tokens.stylex';

export const styles = stylex.create({
  badge: {
    borderRadius: 'var(--radius-full)',
    backgroundColor: colors.badgeBackground,
  },
});
