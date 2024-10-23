import { forwardRef } from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { CompiledStyles, InlineStyles } from '@stylexjs/stylex/lib/StyleXTypes';

import { styles } from './Dropdown.styles';

export const Dropdown = DropdownMenu.Root;

type DropdownTriggerProps = {
  style?: null | undefined | CompiledStyles | boolean | Readonly<[CompiledStyles, InlineStyles]>;
} & Omit<DropdownMenu.TriggerProps, 'className' | 'style'>;

export const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ style, ...props }, forwardedRef) => (
    <DropdownMenu.Trigger
      {...props}
      {...stylex.props(styles.dropdownTrigger, style)}
      ref={forwardedRef}
    />
  )
);

export const DropdownContent = forwardRef<
  HTMLDivElement,
  DropdownMenu.ContentProps & { width: number | string }
>(({ width, ...props }, forwardedRef) => (
  <DropdownMenu.Content
    {...props}
    {...stylex.props(styles.dropdownContent, styles.width(width))}
    ref={forwardedRef}
  />
));

type DropdownItemProps = {
  style?: null | undefined | CompiledStyles | boolean | Readonly<[CompiledStyles, InlineStyles]>;
} & Omit<DropdownMenu.ItemProps, 'className' | 'style'>;

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ style, ...props }, forwardedRef) => (
    <DropdownMenu.Item
      {...props}
      {...stylex.props(styles.dropdownItem, style)}
      ref={forwardedRef}
    />
  )
);
