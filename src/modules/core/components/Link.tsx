import { forwardRef, type MouseEventHandler, useCallback } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useUtils } from '@telegram-apps/sdk-react';

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ onClick: propsOnClick, to, ...rest }, forwardedRef) => {
    const utils = useUtils();

    const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
      (e) => {
        propsOnClick?.(e);

        // Compute if target path is external. In this case we would like to open link using
        // TMA method.
        let path: string;
        if (typeof to === 'string') {
          path = to;
        } else {
          const { search = '', pathname = '', hash = '' } = to;
          path = `${pathname}?${search}#${hash}`;
        }

        const targetUrl = new URL(path, window.location.toString());
        const currentUrl = new URL(window.location.toString());
        const isExternal =
          targetUrl.protocol !== currentUrl.protocol || targetUrl.host !== currentUrl.host;

        if (isExternal) {
          e.preventDefault();
          utils.openLink(targetUrl.toString(), { tryBrowser: true });
        }
      },
      [to, propsOnClick, utils]
    );

    return (
      <RouterLink
        {...rest}
        ref={forwardedRef}
        to={to}
        style={{ ...rest.style, textDecoration: 'none' }}
        onClick={onClick}
      />
    );
  }
);

export default Link;
