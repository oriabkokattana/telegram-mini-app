import { ButtonHTMLAttributes, FC, forwardRef, ReactNode, SVGProps } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import * as stylex from '@stylexjs/stylex';
import { Colors } from '../tokens.stylex';

import { styles } from './IconButton.styles';

export type IconButtonSizes = 'sm' | 'md';
export type IconButtonVariants = 'light-gray' | 'black' | 'gray' | 'outline';

export type IconButtonProps = {
  asChild?: boolean;
  size: IconButtonSizes;
  variant: IconButtonVariants;
  w?: number | string;
  label?: string;
  fill?: Colors;
  stroke?: Colors;
  iconSize?: number | string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { asChild, size, variant, w, label, fill, stroke, iconSize, Icon, children, ...props },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        {...stylex.props(styles.base, w ? styles.w(w) : undefined)}
        {...props}
        ref={forwardedRef}
      >
        <div {...stylex.props(styles.icon, styles[variant], styles[size])}>
          <Icon
            {...stylex.props(
              fill ? styles.fill(fill) : undefined,
              stroke ? styles.stroke(stroke) : undefined,
              iconSize ? styles.iconSize(iconSize) : undefined
            )}
          />
        </div>
        <Slottable>{children}</Slottable>
        {label && <span {...stylex.props(styles.label)}>{label}</span>}
      </Comp>
    );
  }
);
