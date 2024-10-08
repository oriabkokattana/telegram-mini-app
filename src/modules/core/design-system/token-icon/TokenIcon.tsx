import { forwardRef } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as stylex from '@stylexjs/stylex';
import { useThemeStore } from '@/store/theme-store';
import { Text, TextProps } from '../text';

import { styles } from './TokenIcon.styles';

export type TokenIconSizes = 'xs' | 'sm' | 'md' | 'lg';
export type TokenIconVariants = 'monochrome' | 'colored';

const getFallbackFontSize = (size: TokenIconSizes): TextProps['size'] => {
  switch (size) {
    case 'xs':
      return '1';
    case 'sm':
      return '3';
    case 'md':
      return '6';
    case 'lg':
      return '8';
    default:
      return '3';
  }
};

export type TokenIconProps = {
  asChild?: boolean;
  name?: string;
  size: TokenIconSizes;
  variant: TokenIconVariants;
} & Avatar.AvatarProps;

export const TokenIcon = forwardRef<HTMLSpanElement, TokenIconProps>(
  ({ asChild, name, size, variant, ...props }, forwardedRef) => {
    const theme = useThemeStore((state) => state.theme);

    let src = `${import.meta.env.VITE_ICON_URL}/${name}/${name?.toLowerCase()}`;

    if (variant === 'colored') {
      src = src + '-colored.svg';
    } else if (variant === 'monochrome') {
      src = src + (theme === 'dark' ? '-white.svg' : '-black.svg');
    }

    return (
      <Avatar.Root
        asChild={asChild}
        {...stylex.props(styles.base, styles[size])}
        {...props}
        ref={forwardedRef}
      >
        <Avatar.Image {...stylex.props(styles.image)} src={src} alt={name} />
        <Avatar.Fallback {...stylex.props(styles.fallback)}>
          <Text size={getFallbackFontSize(size)} weight='bold'>
            {name?.[0] || '?'}
          </Text>
        </Avatar.Fallback>
      </Avatar.Root>
    );
  }
);
