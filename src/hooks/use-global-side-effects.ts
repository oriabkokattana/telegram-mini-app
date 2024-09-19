import { useEffect } from 'react';
import { useSwipeBehaviorRaw, useViewportRaw } from '@telegram-apps/sdk-react';
import { useOauthLogin } from '@/services/auth/oauth-login/api';
import { useSearchHistoryStoreHydration } from '@/store/search-history-store';
import { useSystemCurrencyStoreHydration } from '@/store/system-currency';
import { useUserStoreHydration } from '@/store/user-store';
import { useSignAuth } from './use-sign-auth';

export const useGlobalSideEffects = () => {
  useOauthLogin();
  useSignAuth();

  const userHydrated = useUserStoreHydration();
  const systemCurrencyHydrated = useSystemCurrencyStoreHydration();
  const searchHistoryStoreHydrated = useSearchHistoryStoreHydration();

  const swipeBehavior = useSwipeBehaviorRaw();
  const viewport = useViewportRaw();

  useEffect(() => {
    if (swipeBehavior.result && viewport.result) {
      if (swipeBehavior.result.supports('disableVerticalSwipe')) {
        swipeBehavior.result.disableVerticalSwipe();
      }
      viewport.result.expand();
    }
  }, [swipeBehavior.result, viewport.result]);

  return !userHydrated || !systemCurrencyHydrated || !searchHistoryStoreHydrated;
};
