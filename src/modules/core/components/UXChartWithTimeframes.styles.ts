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
    width: '100%',
    position: 'relative',
  },
  chart: {
    width: '100%',
    height: 'auto',
  },
  timeframeGroup: {
    width: '100%',
    position: 'absolute',
    left: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 2px',
  },
  timeframe: {
    cursor: 'pointer',
    margin: '0px',
    outline: 'none',
    border: 'none',
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: {
      default: 'transparent',
      ":is([data-state='on'])": colors.grey200,
    },
    color: {
      default: colors.grey700,
      ":is([data-state='on'])": colors.grey1000,
    },
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    transition: 'all 0.15s',
  },
  static: { position: 'static' },
});
