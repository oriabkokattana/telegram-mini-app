import * as stylex from '@stylexjs/stylex';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  shadows,
} from '@/modules/core/design-system/tokens.stylex';

export const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  tabList: {
    display: 'flex',
    marginBottom: '8px',
  },
  tabTrigger: {
    margin: 0,
    border: 'none',
    color: {
      default: colors.grey1000,
      ":is([data-state='active'])": colors.grey900Text,
    },
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: {
      default: fontWeights.normal,
      ":is([data-state='active'])": fontWeights.medium,
    },
    lineHeight: lineHeights.normal,
    padding: '8px 10px',
    cursor: 'pointer',
    borderRadius: {
      ':first-child': '100px 0px 0px 100px',
      ':last-child': '0px 100px 100px 0px',
    },
    backgroundColor: {
      default: 'transparent',
      ":is([data-state='active'])": colors.grey100Background,
    },
  },
  tabContent: {
    display: { default: 'flex', ":is([data-state='inactive'])": 'none' },
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    height: '219px',
  },
  amount: {
    color: colors.nativeTextColor,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH1,
  },
  amountValue: {
    color: colors.grey1000,
    fontWeight: fontWeights.bold,
    textShadow: shadows.shadow2,
  },
  currency: {
    color: colors.grey600,
    fontWeight: fontWeights.medium,
  },
  growthInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
    zIndex: '1',
  },
  growthInfoText: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roboto,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
    textShadow: shadows.shadow2,
  },
  badge: {
    display: 'flex',
    padding: '6px 12px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100px',
    backgroundColor: colors.grey200,
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  chart: {
    height: '164px',
    marginTop: '-40px',
    width: '100%',
    zIndex: 0,
    objectFit: 'cover',
  },
});