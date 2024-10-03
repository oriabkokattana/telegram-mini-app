import * as stylex from '@stylexjs/stylex';
import { colors } from '../design-system/ui.tokens.stylex';

export const styles = stylex.create({
  tooltip: {
    border: '1px solid',
    borderColor: colors.chartTooltipBorder,
    backgroundColor: colors.chartTooltipBackground,
    backdropFilter: 'blur(5px)',
    borderRadius: 'var(--radius-full)',
  },
});
