import * as stylex from '@stylexjs/stylex';
import { colors } from '../ui.tokens.stylex';

export const styles = stylex.create({
  dropdownTrigger: {
    width: 'max-content',
    cursor: 'pointer',
  },
  dropdownContent: {
    backgroundColor: `${colors.dropdownBackground} !important`,
    border: '1px solid',
    borderColor: `${colors.dropdownBorder} !important`,
    backdropFilter: 'blur(5px)',
  },
  dropdownItem: {
    color: {
      default: colors.dropdownColor,
      ':is([data-highlighted])': colors.dropdownHoverColor,
    },
  },
  width: (width) => ({ width }),
});
