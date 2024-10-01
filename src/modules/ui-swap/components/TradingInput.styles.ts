import * as stylex from '@stylexjs/stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

export const styles = stylex.create({
  base: {
    borderRadius: '16px',
    backgroundColor: colors.tradingInputBackground,
    zIndex: '1',
    border: '1px solid',
    borderColor: {
      default: colors.tradingInputBackground,
      ':has(input:focus)': colors.tradingInputBorder,
    },
    transition: 'border-color 0.15s',
  },
  baseError: {
    borderColor: colors.tradingInputError,
  },
  input: {
    outline: 'none',
    border: 'none',
    backgroundImage: 'none',
    backgroundColor: 'transparent',
    '-webkit-box-shadow': 'none',
    '-moz-box-shadow': 'none',
    boxShadow: 'none',
    padding: '0',
    minWidth: '0',
    height: '40px',
    flex: '1',
    textAlign: 'right',
    color: colors.primaryText,
    '::placeholder': {
      color: colors.secondaryText,
    },
    transition: 'color 0.15s',
  },
  inputError: {
    color: colors.tradingInputError,
  },
});
