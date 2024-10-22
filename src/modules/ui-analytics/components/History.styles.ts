import * as stylex from '@stylexjs/stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

export const styles = stylex.create({
  dropdownItem: {
    color: {
      default: colors.dropdownColor,
      ':is([data-highlighted])': colors.dropdownHoverColor,
    },
  },
});
