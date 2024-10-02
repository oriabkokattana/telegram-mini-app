import { FC, forwardRef, SVGProps, useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { CompiledStyles, InlineStyles } from '@stylexjs/stylex/lib/StyleXTypes';

import { styles } from './Icon.styles';

export type IconName =
  | 'analytics'
  | 'chevron-forward'
  | 'chevron-down'
  | 'chevron-up'
  | 'eye'
  | 'eye-closed'
  | 'top-right-arrow'
  | 'bottom-right-arrow'
  | 'arrow-down-half-circle'
  | 'arrow-up-half-circle'
  | 'swap'
  | 'home'
  | 'account'
  | 'clear'
  | 'search'
  | 'bin'
  | 'copy'
  | 'ellipsis'
  | 'collapse'
  | 'circle-check'
  | 'qr-code'
  | 'bell'
  | 'sad-smile'
  | 'list'
  | 'rotate'
  | 'auth-google'
  | 'auth-facebook'
  | 'auth-twitter'
  | 'plus'
  | 'filter'
  | 'progress-clock';

export type IconVariant =
  | 'primary'
  | 'reverse-primary'
  | 'secondary'
  | 'tertiary'
  | 'accent-violet'
  | 'accent-pink'
  | 'white'
  | 'black'
  | 'fill'
  | 'mint'
  | 'plum';

export type IconProps = {
  name: IconName;
  variant?: IconVariant;
  size?: number | string;
  style?: null | undefined | CompiledStyles | boolean | Readonly<[CompiledStyles, InlineStyles]>;
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'className' | 'style'>;

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, variant = 'primary', size, style, ...props }, forwardedRef) => {
    const [SvgIcon, setSvgIcon] = useState<FC<SVGProps<SVGElement>>>();

    useEffect(() => {
      // dynamically import the mentioned svg icon name in props
      const importSvgIcon = async (): Promise<void> => {
        try {
          const module = await import(`@/assets/ui/${name}.svg?react`);
          setSvgIcon(() => module.default); // svgr provides ReactComponent for given svg path
        } catch (err) {
          console.error(err);
        }
      };

      importSvgIcon();
    }, [name]);

    if (!SvgIcon) return null;

    return (
      <SvgIcon
        {...props}
        {...stylex.props(style, styles[variant], !!size && styles.size(size))}
        ref={forwardedRef}
      />
    );
  }
);
