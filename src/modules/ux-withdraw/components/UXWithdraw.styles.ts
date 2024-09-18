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
    padding: '16px 16px 8px 16px',
    backgroundColor: colors.grey100Background,
  },
  headerWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '24px',
  },
  header: {
    margin: '0 auto',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH6,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  amountAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
  separator: {
    width: '1px',
    height: '20px',
    backgroundColor: colors.grey1000,
  },
  click: {
    cursor: 'pointer',
    userSelect: 'none',
    '-webkit-user-select': 'none',
  },
  descriptionWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: 'auto',
    padding: '16px 0',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
  },
  label: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  valueWrapper: {
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  },
  value: {
    color: colors.grey1000,
  },
  currency: {
    color: colors.grey800,
  },
});
