import { useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  useMiniAppRaw,
  useSwipeBehaviorRaw,
  useThemeParamsRaw,
  useViewportRaw,
} from '@telegram-apps/sdk-react';
import { darkTheme } from '@/modules/core/design-system/ui.tokens.stylex';
import { useOauthLogin } from '@/services/auth/oauth-login/api';
import { useUserStoreHydration } from '@/store/user-store';
import { useSignAuth } from './use-sign-auth';

const darkThemeClassNames = stylex.props(darkTheme).className?.split(' ') || [];

export const useGlobalSideEffects = () => {
  useOauthLogin();
  useSignAuth();

  const userHydrated = useUserStoreHydration();

  const swipeBehavior = useSwipeBehaviorRaw();
  const viewport = useViewportRaw();
  const themeParams = useThemeParamsRaw();
  const miniApp = useMiniAppRaw();

  useEffect(() => {
    if (swipeBehavior.result && swipeBehavior.result.supports('disableVerticalSwipe')) {
      swipeBehavior.result.disableVerticalSwipe();
    }
  }, [swipeBehavior.result]);

  useEffect(() => {
    if (viewport.result) {
      viewport.result.expand();
    }
  }, [viewport.result]);

  useEffect(() => {
    if (themeParams.result && miniApp.result) {
      const unsubscribe = themeParams.result.listen();
      const liveThemeUpdate = (e?: `#${string}`) => {
        if (!e) return;

        if (e === '#ffffff') {
          document.documentElement.classList.remove(...darkThemeClassNames, 'dark-theme');
          document.documentElement.classList.add('light-theme');
          if (miniApp.result?.supports('setHeaderColor')) {
            miniApp.result.setHeaderColor('#fefefe');
          }
          if (miniApp.result?.supports('setBackgroundColor')) {
            miniApp.result.setBgColor('#fefefe');
          }
        } else {
          document.documentElement.classList.remove('light-theme');
          document.documentElement.classList.add(...darkThemeClassNames, 'dark-theme');
          if (miniApp.result?.supports('setHeaderColor')) {
            miniApp.result.setHeaderColor('#0c0612');
          }
          if (miniApp.result?.supports('setBackgroundColor')) {
            miniApp.result.setBgColor('#0c0612');
          }
        }
      };
      themeParams.result.on('change:bgColor', liveThemeUpdate);

      liveThemeUpdate(themeParams.result.bgColor);

      return () => {
        unsubscribe();
        themeParams.result?.off('change:bgColor', liveThemeUpdate);
      };
    }
  }, [themeParams.result, miniApp.result]);

  return !userHydrated;
};
