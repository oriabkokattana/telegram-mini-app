import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as stylex from '@stylexjs/stylex';

import { styles } from './Button.styles';

export type ButtonSizes = 'sm' | 'md';

export type ButtonProps = {
  asChild?: boolean;
  size: ButtonSizes;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, size, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'button';

    return <Comp {...stylex.props(styles.base, styles[size])} {...props} ref={forwardedRef} />;
  }
);
