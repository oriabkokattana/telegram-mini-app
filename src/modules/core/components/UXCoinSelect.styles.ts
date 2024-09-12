import * as stylex from '@stylexjs/stylex';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  shadows,
} from '../design-system/tokens.stylex';

export const styles = stylex.create({
  base: {
    borderRadius: '8px',
    backgroundColor: colors.grey0,
    boxShadow: shadows.shadow2,
    overflow: 'hidden',
  },
  trigger: {
    cursor: 'pointer',
    margin: '0px',
    padding: '0px',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    flex: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  },
  valueWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  value: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH5,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  placeholder: {
    color: colors.grey700,
  },
  chevronDownIcon: {
    width: '16px',
    height: '16px',
    fill: colors.grey900Text,
  },
  viewport: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    userSelect: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.15s',
    backgroundColor: {
      default: colors.grey0,
      ':is([data-highlighted])': colors.grey200,
      ":is([data-state='checked'])": colors.grey100Background,
    },
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH5,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  itemText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  itemIndicator: {
    width: '16px',
    height: '16px',
    fill: colors.grey1000,
  },
  separator: {
    height: '1px',
    backgroundColor: colors.grey200,
    display: {
      default: 'block',
      ':last-child': 'none',
    },
  },
  scrollButtonWrapper: {
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollButton: {
    width: '16px',
    height: '16px',
    fill: colors.grey700,
  },
});
