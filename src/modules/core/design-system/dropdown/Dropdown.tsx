import { forwardRef } from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';

import { styles } from './Dropdown.styles';

export const Dropdown = DropdownMenu.Root;

export const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownMenu.TriggerProps>(
  (props, forwardedRef) => (
    <DropdownMenu.Trigger {...props} {...stylex.props(styles.dropdownTrigger)} ref={forwardedRef} />
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

export const DropdownItem = DropdownMenu.Item;
