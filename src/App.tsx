import { useEffect, useMemo } from 'react';
import { Outlet, Route, Router, Routes } from 'react-router-dom';
import { Box, Heading, Text } from '@radix-ui/themes';
import { useIntegration } from '@telegram-apps/react-router-integration';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useMiniApp,
  useSwipeBehaviorRaw,
  useThemeParams,
  useViewport,
  useViewportRaw,
} from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';
import { useSignAuth } from './hooks/use-sign-auth';
import Authorization from './modules/authorization/components/Authorization';
import { PrivateRoute } from './modules/core/components/PrivateRoute';
import { PublicRoute } from './modules/core/components/PublicRoute';
import ScanQrCode from './modules/core/components/ScanQrCode';
import UXAsset from './modules/ux-asset/components/UXAsset';
import UXDeposit from './modules/ux-deposit/components/UXDeposit';
import UXDepositTokenSelect from './modules/ux-deposit/components/UXDepositTokenSelect';
import UXMain from './modules/ux-main/components/UXMain';
import UXProfile from './modules/ux-profile/components/UXProfile';
import TokenGraph from './modules/ux-swap/components/TokenGraph';
import UXSwap from './modules/ux-swap/components/UXSwap';
import UXWithdraw from './modules/ux-withdraw/components/UXWithdraw';
import UXWithdrawTokenSelect from './modules/ux-withdraw/components/UXWithdrawTokenSelect';
import { useOauthLogin } from './services/auth/oauth-login/api';
import { useBalances } from './services/user/balances/api';
import { useBalancesStore } from './store/balances-store';
import { useSearchHistoryStoreHydration } from './store/search-history-store';
import { useSystemCurrencyStoreHydration } from './store/system-currency';
import { useUserStoreHydration } from './store/user-store';

function App() {
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport, viewport?.height]);

  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<UXMain />} />
          <Route path='profile' element={<UXProfile />} />
          <Route path='asset/:asset' element={<UXAsset />} />
          <Route path='deposit-token-select' element={<UXDepositTokenSelect />} />
          <Route path='deposit' element={<UXDeposit />} />
          <Route path='withdraw-token-select' element={<UXWithdrawTokenSelect />} />
          <Route path='withdraw' element={<UXWithdraw />} />
          <Route path='swap' element={<UXSwap />} />
          <Route path='token-graph' element={<TokenGraph />} />
          <Route path='qr-code' element={<ScanQrCode />} />
        </Route>

        <Route
          path='auth'
          element={
            <PublicRoute>
              <Authorization />
            </PublicRoute>
          }
        />

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

function Layout() {
  useOauthLogin();
  useSignAuth();

  const userHydrated = useUserStoreHydration();
  const systemCurrencyHydrated = useSystemCurrencyStoreHydration();
  const searchHistoryStoreHydrated = useSearchHistoryStoreHydration();

  const swipeBehavior = useSwipeBehaviorRaw();
  const viewport = useViewportRaw();

  const balances = useBalances();
  const setBalances = useBalancesStore((state) => state.setBalances);

  useEffect(() => {
    if (balances.data && balances.isSuccess) {
      setBalances(balances.data);
    }
  }, [balances.data, balances.isSuccess]);

  useEffect(() => {
    if (swipeBehavior.result && viewport.result) {
      if (swipeBehavior.result.supports('disableVerticalSwipe')) {
        swipeBehavior.result.disableVerticalSwipe();
      }
      viewport.result.expand();
    }
  }, [swipeBehavior.result, viewport.result]);

  return (
    <div style={{ width: 'var(--tg-viewport-width)', height: '100vh' }}>
      {userHydrated && systemCurrencyHydrated && searchHistoryStoreHydrated ? (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

function NoMatch() {
  return (
    <Box>
      <Heading as='h2'>Nothing to see here!</Heading>
      <Text as='p'>
        <Link to='/'>Go to the home page</Link>
      </Text>
    </Box>
  );
}

export default App;
