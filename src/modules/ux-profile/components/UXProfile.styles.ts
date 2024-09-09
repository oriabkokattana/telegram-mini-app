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
    minHeight: 'var(--tg-viewport-height)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 16px 0 16px',
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
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.headingH4,
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
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.headingH3,
    lineHeight: lineHeights.default,
  },
  currency: {
    color: colors.grey600,
    fontFamily: fontFamilies.roobertPro,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.text2,
    lineHeight: lineHeights.big,
  },
  chevronDownIcon: {
    marginLeft: '8px',
    fill: colors.grey600,
  },
  change: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontWeight: fontWeights.normal,
    fontSize: fontSizes.text1,
    lineHeight: lineHeights.normal,
  },
});
