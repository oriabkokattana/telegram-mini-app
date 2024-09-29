import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as stylex from '@stylexjs/stylex';

import { styles } from './TokenIcon.styles';

export type TokenIconSizes = 'ui-xs' | 'sm' | 'ui-sm' | 'md' | 'ui-md' | 'lg';
export type TokenIconVariants = 'default' | 'with-border';

export type TokenIconProps = {
  asChild?: boolean;
  name: string;
  size?: TokenIconSizes;
  variant?: TokenIconVariants;
  customSize?: number | string;
  label?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export const TokenIcon = forwardRef<HTMLSpanElement, TokenIconProps>(
  (
    { asChild, name, size = 'sm', variant = 'default', customSize, children, ...props },
    forwardedRef
  ) => {
    const src = '';

    return (
      <Avatar.Root
        asChild={asChild}
        {...stylex.props(
          styles.base,
          styles[size],
          styles[variant],
          customSize ? styles.size(customSize) : undefined
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <Avatar.Image {...stylex.props(styles.image)} src={src} alt={name} />
        <Avatar.Fallback {...stylex.props(styles.fallback)}>{name[0]}</Avatar.Fallback>
      </Avatar.Root>
    );
  }
);
