import * as stylex from '@stylexjs/stylex';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
} from '@/modules/core/design-system/tokens.stylex';
import { PortfolioTokenRole } from './Portfolio';

export const styles = stylex.create({
  base: {
    width: '100%',
    flex: '1',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(6, 50px)',
    gridGap: '4px',
  },
  tokenWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
  },
  amountWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: colors.grey0,
    fontFamily: fontFamilies.roobertPro,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  changeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  percent: {
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: colors.grey700,
    color: colors.grey0,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.caption1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.small,
  },
  change: {
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.caption1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.small,
  },
  positive: {
    backgroundColor: colors.grey900Text,
  },
  'positive-percent': {
    backgroundColor: colors.grey700,
  },
  'positive-change': {
    color: colors.grey500Muted,
  },
  negative: {
    backgroundColor: colors.grey600,
  },
  'negative-percent': {
    backgroundColor: colors.grey900Text,
  },
  'negative-change': {
    color: colors.grey300,
  },
  primary: {
    gap: '16px',
    padding: '24px 4px 24px 24px',
    gridColumn: '1',
  },
  'primary-amount': {
    fontSize: fontSizes.headingH2,
  },
  'primary-currency': {
    fontSize: fontSizes.headingH3,
  },
  secondary: {
    gap: '8px',
    padding: '16px 4px 16px 24px',
    gridColumn: '2',
  },
  'secondary-amount': {
    fontSize: fontSizes.headingH4,
  },
  'secondary-currency': {
    fontSize: fontSizes.headingH4,
  },
  r: (index: number, role: PortfolioTokenRole) => ({
    gridRow:
      role === 'primary'
        ? `${3 * index + 1} / ${3 * index + 4}`
        : `${2 * index + 1} / ${2 * index + 3}`,
  }),
});
