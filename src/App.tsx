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
import CreateDeposit from './modules/deposit/components/CreateDeposit';
import Deposit from './modules/deposit/components/Deposit';
import DepositChainSelect from './modules/deposit/components/DepositChainSelect';
import DepositTokenSelect from './modules/deposit/components/DepositTokenSelect';
import History from './modules/history/components/History';
import Landing from './modules/landing/components/Landing';
import Profile from './modules/profile/components/Profile';
import Trading from './modules/trading/components/Trading';
import UXAsset from './modules/ux-asset/components/UXAsset';
import UXDeposit from './modules/ux-deposit/components/UXDeposit';
import UXDepositTokenSelect from './modules/ux-deposit/components/UXDepositTokenSelect';
import UXMain from './modules/ux-main/components/UXMain';
import UXProfile from './modules/ux-profile/components/UXProfile';
import TokenGraph from './modules/ux-swap/components/TokenGraph';
import UXSwap from './modules/ux-swap/components/UXSwap';
import UXWithdraw from './modules/ux-withdraw/components/UXWithdraw';
import UXWithdrawTokenSelect from './modules/ux-withdraw/components/UXWithdrawTokenSelect';
import Withdraw from './modules/withdraw/components/Withdraw';
import WithdrawChainSelect from './modules/withdraw/components/WithdrawChainSelect';
import WithdrawTokenSelect from './modules/withdraw/components/WithdrawTokenSelect';
import { useOauthLogin } from './services/auth/oauth-login/api';
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
  }, [viewport]);

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
          <Route index element={<Landing />} />
          <Route
            path='profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='trading'
            element={
              <PrivateRoute>
                <Trading />
              </PrivateRoute>
            }
          />
          <Route
            path='deposit'
            element={
              <PrivateRoute>
                <Deposit />
              </PrivateRoute>
            }
          />
          <Route
            path='deposit-token-select'
            element={
              <PrivateRoute>
                <DepositTokenSelect />
              </PrivateRoute>
            }
          />
          <Route
            path='deposit-chain-select'
            element={
              <PrivateRoute>
                <DepositChainSelect />
              </PrivateRoute>
            }
          />
          <Route
            path='deposit-create'
            element={
              <PrivateRoute>
                <CreateDeposit />
              </PrivateRoute>
            }
          />
          <Route
            path='withdraw-token-select'
            element={
              <PrivateRoute>
                <WithdrawTokenSelect />
              </PrivateRoute>
            }
          />
          <Route
            path='withdraw-chain-select'
            element={
              <PrivateRoute>
                <WithdrawChainSelect />
              </PrivateRoute>
            }
          />
          <Route
            path='withdraw'
            element={
              <PrivateRoute>
                <Withdraw />
              </PrivateRoute>
            }
          />
          <Route
            path='history'
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />

          <Route
            path='auth'
            element={
              <PublicRoute>
                <Authorization />
              </PublicRoute>
            }
          />

          <Route
            path='ux'
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route path='main' element={<UXMain />} />
            <Route path='profile' element={<UXProfile />} />
            <Route path='asset/:asset' element={<UXAsset />} />
            <Route path='deposit-token-select' element={<UXDepositTokenSelect />} />
            <Route path='deposit' element={<UXDeposit />} />
            <Route path='deposit/:asset' element={<UXDeposit />} />
            <Route path='withdraw-token-select' element={<UXWithdrawTokenSelect />} />
            <Route path='withdraw' element={<UXWithdraw />} />
            <Route path='withdraw/:asset' element={<UXWithdraw />} />
            <Route path='swap' element={<UXSwap />} />
            <Route path='swap/:asset' element={<UXSwap />} />
            <Route path='token-graph' element={<TokenGraph />} />
            <Route path='qr-code' element={<ScanQrCode />} />
          </Route>

          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  useOauthLogin();
  useSignAuth();

  const userHydrated = useUserStoreHydration();
  const systemCurrencyHydrated = useSystemCurrencyStoreHydration();

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

  return (
    <div style={{ width: 'var(--tg-viewport-width)', minHeight: 'var(--tg-viewport-height)' }}>
      {userHydrated && systemCurrencyHydrated ? <Outlet /> : <span>Loading...</span>}
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
