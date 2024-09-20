import * as stylex from '@stylexjs/stylex';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
} from '@/modules/core/design-system/tokens.stylex';

export const styles = stylex.create({
  base: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
  assetRow: {
    width: '100%',
    height: '68px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: {
      default: '1px solid',
      ':last-child': 'none',
    },
    borderBottomColor: {
      default: colors.grey100Background,
      ':last-child': 'none',
    },
  },
  token: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  tokenName: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
  amount: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '4px',
  },
  amountUsd: {
    textAlign: 'right',
    color: colors.grey800,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  badgeWrapper: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  badge: {
    display: 'flex',
    padding: '4px 12px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    color: colors.grey0,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
  even: {
    backgroundColor: colors.grey800,
  },
  odd: {
    backgroundColor: colors.grey600,
  },
  placeholder: {
    margin: 'auto',
    color: colors.grey900Text,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
});
