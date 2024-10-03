import * as stylex from '@stylexjs/stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

export const styles = stylex.create({
  statusIconWrapper: {
    borderRadius: 'var(--radius-full)',
    transition: 'background-color 0.3s',
  },
  violetWrapper: {
    backgroundColor: colors.violetBackground,
  },
  greenWrapper: {
    backgroundColor: colors.greenBackground,
  },
  networkWrapper: {
    borderRadius: 'var(--radius-full)',
  },
});
