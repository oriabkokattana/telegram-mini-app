import * as stylex from '@stylexjs/stylex';
import { colors, fontFamilies, fontSizes, fontWeights } from '../tokens.stylex';
import { colors as uiColors } from '../ui.tokens.stylex';

export const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'hidden',
    userSelect: 'none',
    backgroundColor: colors.grey1000,
    borderRadius: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
  },
  fallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: uiColors.dropdownBackground,
    color: uiColors.primaryIcon,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.roobertPro,
    rotate: '8deg',
    borderRadius: 'inherit',
  },
  size: (size) => ({
    width: size,
    height: size,
  }),
  'ui-xs': {
    width: '16px',
    height: '16px',
    fontSize: fontSizes.text1,
  },
  'ui-sm': {
    width: '24px',
    height: '24px',
    fontSize: fontSizes.text2,
  },
  sm: {
    width: '32px',
    height: '32px',
    fontSize: fontSizes.text2,
  },
  'ui-md': {
    width: '36px',
    height: '36px',
    fontSize: fontSizes.text2,
  },
  md: {
    width: '44px',
    height: '44px',
    fontSize: fontSizes.headingH6,
  },
  lg: {
    width: '64px',
    height: '64px',
    fontSize: fontSizes.headingH1,
  },
  default: {
    backgroundColor: colors.grey100Background,
  },
  'with-border': {
    padding: '4px',
    backgroundColor: colors.grey100Border,
  },
});
