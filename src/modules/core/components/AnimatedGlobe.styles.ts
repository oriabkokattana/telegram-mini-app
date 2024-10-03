import * as stylex from '@stylexjs/stylex';

const rotateMeridians = stylex.keyframes({
  '0%': { transform: 'rotateY(0deg)' },
  '100%': { transform: 'rotateY(360deg)' },
});

export const styles = stylex.create({
  rotatingLines: {
    transformOrigin: '24px 24px',
    animationName: rotateMeridians,
    animationDuration: '4s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});
