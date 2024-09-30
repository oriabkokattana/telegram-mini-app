import { useEffect, useMemo } from 'react';
import { Outlet, Route, Router, Routes } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { useIntegration } from '@telegram-apps/react-router-integration';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useMiniApp,
  useThemeParams,
  useViewport,
} from '@telegram-apps/sdk-react';
import Link from '@/modules/core/components/Link';
import { useGlobalSideEffects } from './hooks/use-global-side-effects';
import Authorization from './modules/authorization/components/Authorization';
import { PrivateRoute } from './modules/core/components/PrivateRoute';
import { PublicRoute } from './modules/core/components/PublicRoute';
import ScanQrCode from './modules/core/components/ScanQrCode';
import UIAnalytics from './modules/ui-analytics/components/UIAnalytics';
import UIAsset from './modules/ui-asset/components/UIAsset';
import UIDeposit from './modules/ui-deposit/components/UIDeposit';
import UIDepositNetworkSelect from './modules/ui-deposit/components/UIDepositNetworkSelect';
import UIDepositTokenSelect from './modules/ui-deposit/components/UIDepositTokenSelect';
import UIMain from './modules/ui-main/components/UIMain';
import UIWithdraw from './modules/ui-withdraw/components/UIWithdraw';
import UIWithdrawNetworkSelect from './modules/ui-withdraw/components/UIWithdrawNetworkSelect';
import UIWithdrawTokenSelect from './modules/ui-withdraw/components/UIWithdrawTokenSelect';
import { useBalances } from './services/user/balances/api';
import { useSystemRates } from './services/user/system-rates/api';
import { useBalancesStore } from './store/balances-store';
import { useSystemCurrencyStore } from './store/system-currency-store';

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

  const loading = useGlobalSideEffects();

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Theme accentColor='violet' grayColor='gray' radius='full'>
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            {/* <Route index element={<UXMain />} />
            <Route path='profile' element={<UXProfile />} />
            <Route path='asset/:asset' element={<UXAsset />} />
            <Route path='deposit-token-select' element={<UXDepositTokenSelect />} />
            <Route path='deposit' element={<UXDeposit />} />
            <Route path='withdraw-token-select' element={<UXWithdrawTokenSelect />} />
            <Route path='withdraw' element={<UXWithdraw />} />
            <Route path='swap' element={<UXSwap />} />
            <Route path='token-graph' element={<TokenGraph />} /> */}
            <Route path='qr-code' element={<ScanQrCode />} />

            <Route path='ui-main' element={<UIMain />} />
            <Route path='ui-deposit-token-select' element={<UIDepositTokenSelect />} />
            <Route path='ui-deposit-network-select' element={<UIDepositNetworkSelect />} />
            <Route path='ui-deposit' element={<UIDeposit />} />
            <Route path='ui-withdraw-token-select' element={<UIWithdrawTokenSelect />} />
            <Route path='ui-withdraw-network-select' element={<UIWithdrawNetworkSelect />} />
            <Route path='ui-withdraw' element={<UIWithdraw />} />
            <Route path='ui-analytics' element={<UIAnalytics />} />
            <Route path='ui-asset/:asset' element={<UIAsset />} />
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
    </Theme>
  );
}

function Layout() {
  const balances = useBalances();
  const setBalances = useBalancesStore((state) => state.setBalances);
  const systemRates = useSystemRates();
  const setRates = useSystemCurrencyStore((state) => state.setRates);

  useEffect(() => {
    if (balances.data && balances.isSuccess) {
      setBalances(balances.data);
    }
  }, [balances.data, balances.isSuccess]);

  useEffect(() => {
    if (systemRates.data && systemRates.isSuccess) {
      setRates(systemRates.data);
    }
  }, [systemRates.data, systemRates.isSuccess]);

  return <Outlet />;
}

function NoMatch() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
