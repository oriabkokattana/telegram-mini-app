import { forwardRef } from 'react';
import { TextField as RootTextField } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { CompiledStyles, InlineStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import { Icon } from '../icon';

import { styles } from './TextField.styles';

export type TextFieldProps = {
  clear?: boolean;
  style?: null | undefined | CompiledStyles | boolean | Readonly<[CompiledStyles, InlineStyles]>;
  value: string;
  onChange(value: string): void;
} & Omit<RootTextField.RootProps, 'style' | 'className' | 'value' | 'onChange'>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ clear, style, value, onChange, children, ...props }, forwardedRef) => {
    return (
      <RootTextField.Root
        {...props}
        {...stylex.props(style)}
        ref={forwardedRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
        {clear && (
          <RootTextField.Slot
            {...stylex.props(styles.clear, value ? styles.show : styles.hide)}
            onClick={() => onChange('')}
          >
            <Icon name='clear' variant='secondary' />
          </RootTextField.Slot>
        )}
      </RootTextField.Root>
    );
  }
);

export const TextFieldSlot = forwardRef<HTMLDivElement, RootTextField.SlotProps>(
  (props, forwardedRef) => <RootTextField.Slot {...props} ref={forwardedRef} />
);
