import * as stylex from '@stylexjs/stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

export const styles = stylex.create({
  dropdownTrigger: {
    width: 'max-content',
    cursor: 'pointer',
  },
  dropdownContent: {
    width: '124px',
    backgroundColor: `${colors.dropdownBackground} !important`,
    border: '1px solid',
    borderColor: `${colors.dropdownBorder} !important`,
    backdropFilter: 'blur(5px)',
    boxShadow: 'none !important',
  },
});
