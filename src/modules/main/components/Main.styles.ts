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
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  account: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  addressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
  },
  nickname: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  nicknameText: {
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.headingH6,
    lineHeight: lineHeights.normal,
  },
  actions: {
    width: '100%',
    display: 'flex',
    gap: '8px',
    padding: '0 16px',
  },
});
