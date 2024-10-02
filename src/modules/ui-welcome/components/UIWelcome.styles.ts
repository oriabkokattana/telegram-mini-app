import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  placeholder: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  light: {
    backgroundImage: 'url("@/modules/ui-welcome/media/placeholder-light.png")',
  },
  dark: {
    backgroundImage: 'url("@/modules/ui-welcome/media/placeholder.png")',
  },
});
