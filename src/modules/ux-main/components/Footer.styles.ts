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
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '16px 8px 0',
    borderTop: '1px solid',
    borderTopColor: colors.grey300,
    backgroundColor: colors.grey0,
    boxShadow: shadows.dropShadow,
  },
  navigationList: {
    display: 'flex',
    gap: '8px',
    margin: '0',
    padding: '0',
  },
  link: {
    flex: '1 0 0',
    display: 'flex',
    padding: '0px 20px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'transparent',
    border: 'none',
    color: {
      default: colors.grey600,
      ':is([data-active])': colors.grey1000,
    },
  },
  icon: {
    transition: 'all 0.15s',
  },
  label: {
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
});
