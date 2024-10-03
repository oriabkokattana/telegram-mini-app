import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  placeholder: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backdropFilter: 'blur(5px)',
    zIndex: '1',
    cursor: 'pointer',
  },
  light: {
    backgroundImage: 'url("@/modules/ui-welcome/media/placeholder-light.png")',
  },
  dark: {
    backgroundImage: 'url("@/modules/ui-welcome/media/placeholder.png")',
  },
});
