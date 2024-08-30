import { ButtonHTMLAttributes, FC, ReactNode, SVGProps } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import * as stylex from '@stylexjs/stylex';

import { styles } from './IconButton.styles';

export type IconButtonSizes = 'sm' | 'md';
export type IconButtonVariants = 'light-gray' | 'black' | 'gray' | 'outline';

export type IconButtonProps = {
  asChild?: boolean;
  size: IconButtonSizes;
  variant: IconButtonVariants;
  w?: number | string;
  label?: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({
  asChild,
  size,
  variant,
  w,
  label,
  Icon,
  children,
  ...props
}: IconButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp {...props} {...stylex.props(styles.base, w ? styles.w(w) : undefined)}>
      <div {...stylex.props(styles.icon, styles[variant], styles[size])}>{<Icon />}</div>
      <Slottable>{children}</Slottable>
      {label && <span {...stylex.props(styles.label)}>{label}</span>}
    </Comp>
  );
};
