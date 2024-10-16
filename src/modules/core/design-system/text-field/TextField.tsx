import { forwardRef } from 'react';
import { IconButton, TextField as RootTextField } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { CompiledStyles, InlineStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import { Icon } from '../icon';

import { styles } from './TextField.styles';

export type TextFieldProps = {
  clear?: boolean;
  error?: boolean;
  style?: null | undefined | CompiledStyles | boolean | Readonly<[CompiledStyles, InlineStyles]>;
  value?: string;
  readOnly?: boolean;
  onChange?(value: string): void;
} & Omit<RootTextField.RootProps, 'style' | 'className' | 'value' | 'readOnly' | 'onChange'>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ clear, error, style, value, readOnly, onChange, children, ...props }, forwardedRef) => {
    return (
      <RootTextField.Root
        onMouseDown={readOnly ? (e) => e.preventDefault() : undefined}
        {...props}
        {...stylex.props(style, error && styles.error)}
        ref={forwardedRef}
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {children}
        {clear && (
          <RootTextField.Slot {...stylex.props(styles.clear, value ? styles.show : styles.hide)}>
            <IconButton variant='ghost' size='1' onClick={() => onChange?.('')}>
              <Icon name='clear' variant='secondary' />
            </IconButton>
          </RootTextField.Slot>
        )}
      </RootTextField.Root>
    );
  }
);

export const TextFieldSlot = RootTextField.Slot;
