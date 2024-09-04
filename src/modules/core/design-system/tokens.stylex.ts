import * as stylex from '@stylexjs/stylex';

// Constants for media queries or other conditions
const DARK = '@media (prefers-color-scheme: dark)';

// Colors
export const colors = stylex.defineVars({
  customTertiaryBgColor: {
    default: 'rgba(244, 244, 247, 1)',
    [DARK]: 'rgba(42, 42, 42, 1)',
  },
  nativeSubtitleTextColor: {
    default: 'rgba(112, 117, 121, 1)',
    [DARK]: 'rgba(170, 170, 170, 1)',
  },
  nativeTextColor: {
    default: 'rgba(0, 0, 0, 1)',
    [DARK]: 'rgba(255, 255, 255, 1)',
  },
  blue: 'rgba(0, 122, 255, 1)',
  grey0: 'rgba(255, 255, 255, 1)',
  grey100Background: 'rgba(247, 247, 247, 1)',
  grey100Border: 'rgba(242, 242, 242, 1)',
  grey1000: 'rgba(0, 0, 0, 1)',
  grey200: 'rgba(234, 234, 234, 1)',
  grey300: 'rgba(222, 222, 222, 1)',
  grey600: 'rgba(125, 125, 125, 1)',
  grey700: 'rgba(104, 104, 104, 1)',
  grey800: 'rgba(67, 67, 67, 1)',
  grey900Text: 'rgba(31, 31, 31, 1)',
});

// Font Families
export const fontFamilies = stylex.defineVars({
  roobertPro: '"Roobert PRO", Helvetica',
  roboto: '"Roboto", Helvetica',
});

// Font Sizes
export const fontSizes = stylex.defineVars({
  caption1: '12px',
  caption2: '13px',
  text1: '14px',
  text2: '16px',
  headingH6: '18px',
  headingH1: '40px',
});

// Font Weights
export const fontWeights = stylex.defineVars({
  normal: '400',
  medium: '500',
  bold: 'bold',
});

// Shadows
export const shadows = stylex.defineVars({
  dropShadow: '0px -10px 10px 0px rgba(34, 34, 34, 0.03)',
  shadow2: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)',
  textShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)',
  token:
    '0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 7px 7px 0px rgba(0, 0, 0, 0.09), 0px 16px 10px 0px rgba(0, 0, 0, 0.05), 0px 29px 12px 0px rgba(0, 0, 0, 0.01), 0px 45px 13px 0px rgba(0, 0, 0, 0)',
  token2:
    '0px 2.5797px 11.1004px 0px rgba(0, 0, 0, 0.02), 0px 11.1125px 20.9281px 0px rgba(0, 0, 0, 0.04), 0px 26.7891px 34.9980px 0px rgba(0, 0, 0, 0.05), 0px 50.8000px 58.8250px 0px rgba(0, 0, 0, 0.06), 0px 84.3359px 97.9238px 0px rgba(0, 0, 0, 0.08), 0px 128.5875px 157.8094px 0px rgba(0, 0, 0, 0.09), 0px 184.7453px 243.9965px 0px rgba(0, 0, 0, 0.11), 0px 254px 362px 0px rgba(0, 0, 0, 0.13)',
});

// Line Heights
export const lineHeights = stylex.defineVars({
  default: 'normal',
  small: '14px',
  normal: '16px',
  big: '20px',
});

// Letter Spacing
export const letterSpacings = stylex.defineVars({
  small: '0.1px',
});
