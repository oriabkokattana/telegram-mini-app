import * as stylex from '@stylexjs/stylex';
import { colors, fontFamilies, fontSizes, fontWeights, lineHeights } from '../tokens.stylex';

export const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    color: colors.grey900Text,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  inputWrapper: {
    flex: '1 0 0',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '100px',
    backgroundColor: colors.grey200,
  },
  input: {
    outline: 'none',
    border: 'none',
    backgroundImage: 'none',
    backgroundColor: 'transparent',
    '-webkit-box-shadow': 'none',
    '-moz-box-shadow': 'none',
    boxShadow: 'none',
    flex: '1 0 0',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    '::placeholder': {
      color: colors.grey700,
    },
  },
  readOnly: {
    flex: '1 0 0',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
  },
  placeholder: {
    color: colors.grey700,
  },
  pointer: {
    cursor: 'pointer',
  },
  w: (width) => ({
    width,
  }),
  sm: {
    gap: '16px',
    padding: '12px 6px 12px 16px',
  },
  'input-sm': {
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
  md: {
    gap: '8px',
    padding: '16px',
  },
  'input-md': {
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
});
