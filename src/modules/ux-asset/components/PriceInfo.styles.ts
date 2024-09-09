import * as stylex from '@stylexjs/stylex';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  shadows,
} from '@/modules/core/design-system/tokens.stylex';

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
    height: '72px',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    cursor: 'pointer',
    backgroundColor: colors.grey0,
    borderRadius: '12px 12px 0 0',
    boxShadow: shadows.dropShadow,
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  priceWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
  chart: {
    width: 'auto',
    height: '100%',
  },
  chevronUpIcon: {
    width: '24px',
    height: '24px',
    fill: colors.grey600,
  },
  overlay: {
    position: 'fixed',
    inset: '0',
  },
  dialog: {
    position: 'fixed',
    top: '100%',
    left: '0',
    right: '0',
    zIndex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 16px',
    overflow: 'auto',
    borderRadius: '12px 12px 0px 0px',
    backgroundColor: colors.grey0,
    boxShadow: shadows.dropShadow,
    outline: {
      default: null,
      ':focus': 'none',
    },
  },
  headerWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0 16px 24px',
  },
  header: {
    margin: '0 auto',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH6,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  close: {
    cursor: 'pointer',
    margin: '0px',
    padding: '0px',
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceInfo: {
    margin: '0',
    padding: '0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontWeight: fontWeights.medium,
  },
  price: {
    fontSize: fontSizes.headingH5,
    lineHeight: lineHeights.default,
  },
  change: {
    fontSize: fontSizes.text2,
    lineHeight: lineHeights.big,
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
