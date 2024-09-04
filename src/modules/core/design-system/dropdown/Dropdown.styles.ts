import * as stylex from '@stylexjs/stylex';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  shadows,
} from '../tokens.stylex';

export const styles = stylex.create({
  base: {
    minWidth: '132px',
    borderRadius: '8px',
    boxShadow: shadows.shadow2,
    willChange: 'transform, opacity',
    overflow: 'hidden',
  },
  trigger: {
    cursor: 'pointer',
    margin: '0px',
    padding: '0px',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    userSelect: 'none',
    outline: 'none',
    cursor: 'pointer',
    display: 'flex',
    padding: '16px',
    borderBottom: {
      default: '1px solid',
      ':last-child': 'none',
    },
    borderBottomColor: colors.grey200,
    transition: 'background-color 0.3s',
    backgroundColor: {
      default: colors.grey0,
      ':is([data-highlighted])': colors.grey200,
    },
    color: colors.grey900Text,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  },
  selected: {
    backgroundColor: colors.grey100Background,
  },
});
