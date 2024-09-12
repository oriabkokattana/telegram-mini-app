import * as stylex from '@stylexjs/stylex';
import { colors, fontFamilies, fontSizes, fontWeights, lineHeights } from '../tokens.stylex';

export const styles = stylex.create({
  base: {
    cursor: 'pointer',
    margin: '0px',
    padding: '0px',
    border: 'none',
    backgroundColor: {
      default: colors.grey900Text,
      ':active': colors.grey800,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100px',
    color: colors.grey0,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    lineHeight: lineHeights.big,
    transition: 'background-color 0.15s',
  },
  sm: {
    gap: '4px',
    padding: '6px 10px',
    fontWeight: fontWeights.normal,
  },
  md: {
    width: '100%',
    gap: '8px',
    padding: '12px 16px',
    fontWeight: fontWeights.medium,
  },
});
