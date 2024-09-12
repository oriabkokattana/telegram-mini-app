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
    minHeight: 'var(--tg-viewport-height)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '48px',
    padding: '21px 17px 23px',
    backgroundColor: colors.grey0,
  },
  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '24px',
  },
  header: {
    margin: '0 auto',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.headingH6,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.default,
  },
  tokenGraphWrapper: {
    width: '292px',
    flex: '1',
    position: 'relative',
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text2,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.big,
  },
  tokenGraph: {
    height: '155%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    translate: '-50% -50%',
  },
  from: {
    position: 'absolute',
    bottom: '36px',
    right: '29px',
  },
  to: {
    position: 'absolute',
    top: '0',
    right: '40px',
  },
  feeLabel: {
    padding: '4px 16px',
    borderRadius: '100px',
    backgroundColor: colors.grey100Background,
    color: colors.grey1000,
    fontFamily: fontFamilies.roobertPro,
    fontSize: fontSizes.text1,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  },
});
