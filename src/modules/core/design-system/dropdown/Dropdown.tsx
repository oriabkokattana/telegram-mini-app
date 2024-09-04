import { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as stylex from '@stylexjs/stylex';

import { styles } from './Dropdown.styles';

export type DropdownProps = {
  items: string[];
  selected?: string;
  onSelect(value: unknown): void;
  children: ReactNode;
};

export const Dropdown = ({ items, selected, onSelect, children }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button {...stylex.props(styles.trigger)}>{children}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          {...stylex.props(styles.base)}
          sideOffset={8}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              {...stylex.props(styles.item, selected === item && styles.selected)}
              key={item}
              onSelect={() => onSelect(item)}
            >
              {item}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
