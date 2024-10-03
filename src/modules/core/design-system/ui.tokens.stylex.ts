import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  themeBackground: '#FEFEFE',

  // Text Colors
  primaryText: '#0C0612',
  secondaryText: '#75788B',

  // Timeframe Colors
  timeframeBackground: '#F3F4F7',
  timeframeText: '#75788B',
  timeframeActiveText: '#75788B',
  timeframeBackgroundTransparent: '#75788B',
  timeframeTextTransparent: '#75788B',
  timeframeActiveTextTransparent: '#FEFEFE',

  // Trading Colors
  tradingRotateBackground: '#583BE8',
  tradingRotateBorder: '#FEFEFE',
  tradingInputBackground: '#F3F4F7',
  tradingInputBorder: '#583BE8',
  tradingInputError: '#FF65B3',
  tradingTokenSelectBackground: '#FEFEFE',
  tradingPercentBackground: '#F3F4F7',
  tradingPercentBackgroundActive: 'rgba(117, 120, 139, 0.4)',

  // Badge Colors
  badgeBackground: 'rgba(117, 120, 139, 0.1)',

  // Main Footer Colors
  mainFooterBackground: '#F3F4F7',
  mainFooterBorder: 'rgba(255, 255, 255, 0.05)',

  // Asset Footer Colors
  assetFooterBackground: '#F3F4F7',
  assetFooterBorder: 'rgba(255, 255, 255, 0.05)',

  // Dropdown Colors
  dropdownBackground: '#F3F4F7',
  dropdownBorder: 'rgba(0, 0, 51, 0.06)',

  // Dialog Colors
  dialogBackground: '#F3F4F7',

  // Chart Tooltip Colors
  chartTooltipBorder: '#F3F4F7',
  chartTooltipBackground: 'rgba(255, 255, 255, 0.40)',

  // Backgrounds
  violetBackground: 'rgba(225, 219, 250, 1)',
  greenBackground: 'rgba(207, 246, 227, 1)',

  // Icon Colors
  primaryIcon: 'rgba(12, 6, 18, 1)',
  secondaryIcon: 'rgba(117, 120, 139, 1)',
  tertiaryIcon: 'rgba(117, 120, 139, 1)',
  reversePrimary: 'rgba(250, 250, 250, 1)',
  accentVioletIcon: 'rgba(88, 59, 232, 1)',
  accentPinkIcon: 'rgba(255, 101, 179, 1)',
  whiteIcon: 'rgba(250, 250, 250, 1)',
  fillIcon: 'rgba(222, 222, 222, 1)',
  blackIcon: 'rgba(12, 6, 18, 1)',
  mintIcon: 'rgba(53, 219, 140, 1)',
  plumIcon: 'rgba(88, 59, 232, 1)',
});

export const darkTheme = stylex.createTheme(colors, {
  themeBackground: '#0C0612',

  // Text Colors
  primaryText: '#FAFAFA',
  secondaryText: '#9A94AA',

  // Timeframe Colors
  timeframeBackground: '#221D2E',
  timeframeText: '#9A94AA',
  timeframeActiveText: '#FAFAFA',
  timeframeBackgroundTransparent: '#221D2E',
  timeframeTextTransparent: '#75788B',
  timeframeActiveTextTransparent: '#9A94AA',

  // Trading Input Colors
  tradingRotateBackground: '#FAFAFA',
  tradingRotateBorder: '#0C0612',
  tradingInputBackground: '#221D2E',
  tradingInputBorder: '#583BE8',
  tradingTokenSelectBackground: '#0C0612',
  tradingPercentBackground: '#221D2E',
  tradingPercentBackgroundActive: 'rgba(117, 120, 139, 0.3)',

  // Badge Colors
  badgeBackground: 'rgba(250, 250, 250, 0.1)',

  // Footer Colors
  mainFooterBackground: 'rgba(7, 7, 8, 0.25)',

  // Asset Footer Colors
  assetFooterBackground: '#221D2E',

  // Dropdown Colors
  dropdownBackground: 'rgba(34, 29, 46, 0.8)',
  dropdownBorder: 'rgba(221, 234, 248, 0.08)',

  // Dialog Colors
  dialogBackground: '#110A21',

  // Chart Tooltip Colors
  chartTooltipBorder: 'rgba(154, 148, 170, 0.05)',
  chartTooltipBackground: 'rgba(34, 29, 46, 0.40)',

  // Backgrounds
  violetBackground: 'rgba(26, 15, 56, 1)',
  greenBackground: 'rgba(21, 56, 46, 1)',

  // Icon Colors
  primaryIcon: 'rgba(254, 254, 254, 1)',
  reversePrimary: 'rgba(34, 29, 46, 1)',
  secondaryIcon: 'rgba(154, 148, 170, 1)',
  tertiaryIcon: 'rgba(250, 250, 250, 1)',
  accentVioletIcon: 'rgba(174, 154, 255, 1)',
  fillIcon: 'rgba(114, 116, 134, 1)',
  blackIcon: 'rgba(34, 29, 46, 1)',
});
