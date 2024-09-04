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
    alignItems: 'center',
    gap: '16px',
    padding: '16px 16px 0 16px',
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
  qrCodeWrapper: {
    width: '284px',
    height: '284px',
    margin: '0 8px',
  },
  qrCode: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '24px',
  },
  address: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH6,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  descriptionWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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
  networkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  network: {
    color: colors.grey600,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.caption1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.small,
  },
});
