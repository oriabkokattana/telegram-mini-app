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
    minHeight: '100% !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 16px 24px 16px',
    backgroundColor: colors.grey0,
  },
  portfolio: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH4,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  value: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '2px',
  },
  amountWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  amount: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH3,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  currency: {
    color: colors.grey600,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
  chevronDownIcon: {
    marginLeft: '8px',
    fill: colors.grey600,
  },
  change: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
});
