import * as stylex from '@stylexjs/stylex';
import { colors } from '../ui.tokens.stylex';

export const styles = stylex.create({
  primary: {
    fill: colors.primaryIcon,
  },
  secondary: {
    fill: colors.secondaryIcon,
  },
  tertiary: {
    fill: colors.tertiaryIcon,
  },
  'accent-violet': {
    fill: colors.accentVioletIcon,
  },
  'accent-pink': {
    fill: colors.accentPinkIcon,
  },
  fill: {
    fill: colors.fillIcon,
  },
  white: {
    fill: colors.whiteIcon,
  },
  size: (size: number | string) => ({
    width: size,
    height: size,
  }),
});