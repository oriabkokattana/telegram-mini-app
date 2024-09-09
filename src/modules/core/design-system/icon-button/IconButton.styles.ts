import * as stylex from '@stylexjs/stylex';
import type { Colors } from '../tokens.stylex';
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
  fill: (color: Colors) => ({
    fill: colors[color],
  }),
  stroke: (color: keyof typeof colors) => ({
    stroke: colors[color],
  }),
  iconSize: (iconSize: number | string) => ({
    width: iconSize,
    height: iconSize,
  }),
  label: {
    color: colors.grey900Text,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  w: (width: number | string) => ({
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
