import * as stylex from '@stylexjs/stylex';
import { colors, fontFamilies, fontSizes, fontWeights, lineHeights } from '../tokens.stylex';

export const styles = stylex.create({
  base: {
    cursor: 'pointer',
    margin: '0px',
    padding: '0px',
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
  },
  label: {
    color: colors.grey900Text,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  w: (width) => ({
    width,
  }),
  sm: {
    padding: '10px',
    width: '44px',
    height: '44px',
  },
  md: {
    padding: '16px',
    width: '56px',
    height: '56px',
  },
  'light-gray': {
    backgroundColor: colors.grey100Background,
  },
  black: {
    backgroundColor: colors.grey1000,
  },
  gray: {
    backgroundColor: colors.grey300,
  },
  outline: {
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: colors.grey300,
  },
});
