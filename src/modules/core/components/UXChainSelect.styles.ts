import * as stylex from '@stylexjs/stylex';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  shadows,
} from '../design-system/tokens.stylex';

const appear = stylex.keyframes({
  '0%': { translate: '0 0' },
  '100%': { translate: '0 -100%' },
});

const hide = stylex.keyframes({
  '0%': { translate: '0 -100%' },
  '100%': { translate: '0 20px' },
});

export const styles = stylex.create({
  base: {
    position: 'fixed',
    height: '90%',
    top: '100%',
    left: '0',
    right: '0',
    zIndex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '0 16px 0px 16px',
    overflow: 'auto',
    borderRadius: '10px 10px 0px 0px',
    backgroundColor: colors.grey0,
    boxShadow: shadows.shadow2,
    '::backdrop': {
      backgroundColor: 'transparent',
    },
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    outline: {
      default: null,
      ':focus': 'none',
    },
  },
  overlay: {
    position: 'fixed',
    inset: 0,
  },
  collapseWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '16px',
  },
  collapseIcon: {
    flex: '0 0 5px',
  },
  header: {
    margin: '0',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH6,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  warningBlock: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: colors.grey200,
  },
  warningWrapper: {
    margin: '0',
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.small,
  },
  warning: {
    color: colors.grey900Text,
  },
  token: {
    color: colors.grey1000,
  },
  alertCircleIcon: {
    flex: '0 0 20px',
  },
  chainWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: colors.grey300,
    cursor: 'pointer',
  },
  chain: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
  description: {
    color: colors.grey800,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  appear: {
    animationName: appear,
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
  hide: {
    animationName: hide,
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
});
