import * as stylex from '@stylexjs/stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

const appear = stylex.keyframes({
  '0%': { translate: '0 -68px' },
  '100%': { translate: '0 -100%' },
});

const appearElongated = stylex.keyframes({
  '0%': { translate: '0 -92px' },
  '100%': { translate: '0 -100%' },
});

const hide = stylex.keyframes({
  '0%': { translate: '0 -100%' },
  '100%': { translate: '0 -68px' },
});

const hideElongated = stylex.keyframes({
  '0%': { translate: '0 -100%' },
  '100%': { translate: '0 -92px' },
});

export const styles = stylex.create({
  base: {
    translate: '0 -68px',
    padding: '0 var(--space-5)',
    borderRadius: '24px 24px 0px 0px',
    border: '1px solid',
    borderColor: colors.assetFooterBorder,
    backgroundColor: colors.assetFooterBackground,
    backdropFilter: 'blur(15px)',
  },
  bottomGap: {
    paddingBottom: 'var(--space-5)',
  },
  appearElongated: {
    translate: '0 -92px',
    animationName: appearElongated,
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
  apper: {
    animationName: appear,
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
  hideElongated: {
    animationName: hideElongated,
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
  hide: {
    animationName: hide,
    animationDuration: '0.3s',
    animationFillMode: 'forwards',
  },
  chevronIcon: {
    transition: 'rotate 0.3s',
  },
  rotate: {
    rotate: '-180deg',
  },
});
