import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'hidden',
    userSelect: 'none',
    backgroundColor: 'transparent',
    borderRadius: '100%',
  },
  image: {
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
    backgroundColor: 'transparent',
    rotate: '4deg',
    borderRadius: 'inherit',
  },
  xs: {
    width: '16px',
    height: '16px',
  },
  sm: {
    width: '24px',
    height: '24px',
  },
  md: {
    width: '30px',
    height: '30px',
  },
  lg: {
    width: '44px',
    height: '44px',
  },
});
