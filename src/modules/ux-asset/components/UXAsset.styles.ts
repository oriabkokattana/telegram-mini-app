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
    gap: '24px',
    padding: '16px 16px 100px',
    backgroundColor: colors.grey0,
  },
  overall: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  infoWrapper: {
    width: '100%',
    display: 'flex',
    paddingLeft: '24px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    margin: '0 auto',
  },
  amountWrapper: {
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  amount: {
    color: colors.grey1000,
  },
  currency: {
    color: colors.grey600,
  },
  changeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: colors.grey700,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
  actions: {
    width: '100%',
    display: 'flex',
    gap: '8px',
    paddingTop: '8px',
  },
  purchaseWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    backgroundColor: colors.grey100Background,
    borderRadius: '16px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.grey700,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  value: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  },
});
