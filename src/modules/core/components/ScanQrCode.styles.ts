import * as stylex from '@stylexjs/stylex';
import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
} from '../design-system/tokens.stylex';

export const styles = stylex.create({
  base: {
    width: '100%',
    height: 'var(--tg-viewport-stable-height)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 17px',
    backgroundColor: colors.grey100Background,
  },
  headerWrapper: {
    width: '100%',
    height: 'max-content',
    display: 'flex',
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
  qrCodeFrame: {
    width: '327px',
    height: '330px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    translate: '-50% -50%',
    backgroundImage: 'url("@/assets/frame.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeWrapper: {
    width: '305px',
    height: '305px',
  },
  qrCode: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '24px',
  },
});
