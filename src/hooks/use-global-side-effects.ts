import { useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  useLaunchParams,
  useMiniApp,
  useSwipeBehavior,
  useThemeParams,
  useViewport,
} from '@telegram-apps/sdk-react';
import { setAmplitudeUserProperties } from '@/amplitude';
import { darkTheme } from '@/modules/core/design-system/ui.tokens.stylex';
import { useOauthLogin } from '@/services/auth/oauth-login/api';
import { useThemeStore } from '@/store/theme-store';
import { useUserStoreHydration } from '@/store/user-store';
import useTrackAppExit from './use-track-app-exit';
// import { useSignAuth } from './use-sign-auth';

const darkThemeClassNames = stylex.props(darkTheme).className?.split(' ') || [];

export const useGlobalSideEffects = () => {
  useOauthLogin();
  // useSignAuth();
  useTrackAppExit();

  const userHydrated = useUserStoreHydration();
  const setTheme = useThemeStore((state) => state.setTheme);

  const swipeBehavior = useSwipeBehavior();
  const viewport = useViewport();
  const themeParams = useThemeParams();
  const miniApp = useMiniApp();
  const launchParams = useLaunchParams();

  useEffect(() => {
    if (swipeBehavior.supports('disableVerticalSwipe')) {
      swipeBehavior.disableVerticalSwipe();
    }
  }, [swipeBehavior]);

  useEffect(() => {
    if (viewport) {
      viewport.expand();
    }
  }, [viewport]);

  useEffect(() => {
    setAmplitudeUserProperties({
      user_id: launchParams.initData?.user?.id.toString() || '-1',
      user_name: launchParams.initData?.user?.username || 'unknown',
    });
  }, [launchParams]);

  useEffect(() => {
    const unsubscribe = themeParams.listen();
    const liveThemeUpdate = (e?: `#${string}`) => {
      if (!e) return;

      if (e === '#ffffff') {
        document.documentElement.classList.remove(...darkThemeClassNames, 'dark-theme');
        document.documentElement.classList.add('light-theme');
        setTheme('light');
        if (miniApp.supports('setHeaderColor')) {
          miniApp.setHeaderColor('#fefefe');
        }
        if (miniApp.supports('setBackgroundColor')) {
          miniApp.setBgColor('#fefefe');
        }
      } else {
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add(...darkThemeClassNames, 'dark-theme');
        setTheme('dark');
        if (miniApp.supports('setHeaderColor')) {
          miniApp.setHeaderColor('#0c0612');
        }
        if (miniApp.supports('setBackgroundColor')) {
          miniApp.setBgColor('#0c0612');
        }
      }
    };
    themeParams.on('change:bgColor', liveThemeUpdate);

    liveThemeUpdate(themeParams.bgColor);

    return () => {
      themeParams.off('change:bgColor', liveThemeUpdate);
      unsubscribe();
    };
  }, [themeParams, miniApp]);

  return !userHydrated;
};
