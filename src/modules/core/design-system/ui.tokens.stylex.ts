import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  // Text Colors
  primaryText: '#0C0612',
  secondaryText: '#75788B',

  // Badge Colors
  badgeBackground: 'rgba(117, 120, 139, 0.1)',

  // Footer Colors
  footerBackground: '#F3F4F7',
  footerBorder: 'rgba(255, 255, 255, 0.05)',

  // Dropdown Colors
  dropdownBackground: '#F3F4F7',
  dropdownBorder: 'rgba(0, 0, 51, 0.06)',

  // Dialog Colors
  dialogBackground: '#F3F4F7',

  // Backgrounds
  violetBackground: 'rgba(225, 219, 250, 1)',

  // Icon Colors
  primaryIcon: 'rgba(12, 6, 18, 1)',
  secondaryIcon: 'rgba(117, 120, 139, 1)',
  tertiaryIcon: 'rgba(117, 120, 139, 1)',
  accentVioletIcon: 'rgba(88, 59, 232, 1)',
  accentPinkIcon: 'rgba(255, 101, 179, 1)',
  whiteIcon: 'rgba(250, 250, 250, 1)',
  fillIcon: 'rgba(222, 222, 222, 1)',
  blackIcon: 'rgba(12, 6, 18, 1)',
});

export const darkTheme = stylex.createTheme(colors, {
  // Text Colors
  primaryText: '#FAFAFA',
  secondaryText: '#9A94AA',

  // Badge Colors
  badgeBackground: 'rgba(250, 250, 250, 0.1)',

  // Footer Colors
  footerBackground: 'rgba(7, 7, 8, 0.25)',

  // Dropdown Colors
  dropdownBackground: 'rgba(34, 29, 46, 0.8)',
  dropdownBorder: 'rgba(221, 234, 248, 0.08)',

  // Dialog Colors
  dialogBackground: '#110A21',

  // Backgrounds
  violetBackground: 'rgba(26, 15, 56, 1)',

  // Icon Colors
  primaryIcon: 'rgba(254, 254, 254, 1)',
  secondaryIcon: 'rgba(154, 148, 170, 1)',
  tertiaryIcon: 'rgba(250, 250, 250, 1)',
  accentVioletIcon: 'rgba(174, 154, 255, 1)',
  fillIcon: 'rgba(114, 116, 134, 1)',
  blackIcon: 'rgba(34, 29, 46, 1)',
});
