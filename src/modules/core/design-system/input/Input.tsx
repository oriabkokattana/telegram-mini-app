import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import * as Label from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';

import { styles } from './Input.styles';

export type InputSizes = 'sm' | 'md';
export type InputVariants = 'grey100' | 'grey200' | 'grey300';

export type InputProps = {
  size: InputSizes;
  variant: InputVariants;
  w?: number | string;
  label?: string;
  extraLabel?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  readOnly?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'readOnly'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { size, variant, w, label, extraLabel, leftElement, rightElement, readOnly, ...props },
    forwardedRef
  ) => {
    return (
      <div {...stylex.props(styles.base, styles.w(w))}>
        {label && (
          <div {...stylex.props(styles.labelWrapper)}>
            <Label.Root htmlFor={label}>{label}</Label.Root>
            {extraLabel}
          </div>
        )}
        <div
          {...stylex.props(
            styles.inputWrapper,
            styles[size],
            styles[variant],
            readOnly && !!props.onClick ? styles.pointer : undefined
          )}
          {...(readOnly ? props : {})}
        >
          {leftElement}
          {readOnly ? (
            <span
              {...stylex.props(
                styles.readOnly,
                styles[`input-${size}`],
                props.value ? undefined : styles.placeholder
              )}
              id={label}
            >
              {props.value || props.placeholder}
            </span>
          ) : (
            <input
              {...stylex.props(styles.input, styles[`input-${size}`])}
              spellCheck={false}
              type='text'
              id={label}
              {...props}
              ref={forwardedRef}
            />
          )}
          {rightElement}
        </div>
      </div>
    );
  }
);
