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
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'var(--tg-viewport-height)',
  },
  tabListWrapper: {
    width: '100%',
    position: 'relative',
    '::before': {
      content: '',
      position: 'absolute',
      width: '49px',
      height: '40px',
      top: '6px',
      left: '0px',
      background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
      pointerEvents: 'none',
    },
    '::after': {
      content: '',
      position: 'absolute',
      width: '49px',
      height: '40px',
      top: '6px',
      right: '0px',
      background: 'linear-gradient(270deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
      pointerEvents: 'none',
    },
  },
  tabList: {
    width: '100%',
    display: 'flex',
    gap: '8px',
    padding: '8px 16px 0',
    overflowX: 'auto',
    overflowY: 'hidden',
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  tabTrigger: {
    margin: 0,
    border: 'none',
    color: {
      default: colors.grey1000,
      ":is([data-state='active'])": colors.grey900Text,
    },
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    whiteSpace: 'nowrap',
    fontWeight: {
      default: fontWeights.normal,
      ":is([data-state='active'])": fontWeights.medium,
    },
    lineHeight: lineHeights.big,
    padding: '8px 10px',
    cursor: 'pointer',
    borderRadius: '100px',
    backgroundColor: {
      default: 'transparent',
      ":is([data-state='active'])": colors.grey100Background,
    },
  },
  swipeContainer: {
    overflow: 'hidden',
    padding: '16px 0 84px',
  },
  tabContentWrapper: {
    display: 'flex',
    gap: '9px',
    padding: '0 17px',
    transition: 'translate 0.3s ease-in-out',
  },
  tabContent: {
    display: { default: 'flex', ":is([data-state='inactive'])": 'flex' },
    flex: '0 0 calc(var(--tg-viewport-width) - 34px)',
    height: '518px',
    borderRadius: '16px',
    borderTop: '1px solid',
    borderTopColor: colors.grey200,
    backgroundColor: colors.grey0,
    boxShadow: shadows.shadow2,
  },
  tx: (index) => ({ translate: `calc(-${index} * (var(--tg-viewport-width) - 25px))` }),
});
