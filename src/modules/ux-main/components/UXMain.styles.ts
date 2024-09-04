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
    padding: '16px 0 0',
    backgroundColor: colors.grey0,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    padding: '0 16px',
  },
  avatarWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    flex: '0 0 44px',
    width: '44px',
    height: '44px',
    borderRadius: '100px',
    overflow: 'hidden',
    userSelect: 'none',
    cursor: 'pointer',
  },
  avatar: {
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
    backgroundColor: colors.grey1000,
    color: colors.grey0,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.roobertPro,
    borderRadius: 'inherit',
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
