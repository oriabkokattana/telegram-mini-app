import * as stylex from '@stylexjs/stylex';
import { colors } from '@/modules/core/design-system/ui.tokens.stylex';

export const styles = stylex.create({
  base: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '0 var(--space-7)',
    borderRadius: '24px 24px 0px 0px',
    border: '1px solid',
    borderColor: colors.mainFooterBorder,
    backgroundColor: colors.mainFooterBackground,
    backdropFilter: 'blur(15px)',
  },
  bottomGap: {
    paddingBottom: 'var(--space-5)',
  },
  navigationList: {
    height: '64px',
    display: 'flex',
    margin: '0',
    padding: '0',
  },
  link: {
    flex: '1',
    backgroundColor: 'transparent',
    border: 'none',
    color: {
      default: `${colors.secondaryText} !important`,
      ':is([data-active])': `${colors.primaryText} !important`,
    },
  },
});
