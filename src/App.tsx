import { useEffect, useMemo, useRef } from 'react';
import { Outlet, Route, Router, Routes } from 'react-router-dom';
import { Flex, Heading, Text, Theme } from '@radix-ui/themes';
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
import BackSwipe from './modules/core/components/GoBackSwipe';
import { PrivateRoute } from './modules/core/components/PrivateRoute';
import { PublicRoute } from './modules/core/components/PublicRoute';
import UIAnalytics from './modules/ui-analytics/components/UIAnalytics';
import UIAsset from './modules/ui-asset/components/UIAsset';
import UIDeposit from './modules/ui-deposit/components/UIDeposit';
import UIDepositNetworkSelect from './modules/ui-deposit/components/UIDepositNetworkSelect';
import UIDepositTokenSelect from './modules/ui-deposit/components/UIDepositTokenSelect';
import CustomizeLabel from './modules/ui-main/components/CustomizeLabel';
import UIMain from './modules/ui-main/components/UIMain';
import UISwap from './modules/ui-swap/components/UISwap';
import UISwapTokenSelectScreen from './modules/ui-swap/components/UISwapTokenSelectScreen';
import UIWelcome from './modules/ui-welcome/components/UIWelcome';
import UIWithdraw from './modules/ui-withdraw/components/UIWithdraw';
import UIWithdrawNetworkSelect from './modules/ui-withdraw/components/UIWithdrawNetworkSelect';
import UIWithdrawTokenSelect from './modules/ui-withdraw/components/UIWithdrawTokenSelect';
import { useBalances } from './services/user/balances/api';
import { useSystemRates } from './services/user/system-rates/api';
import { useBalancesStore } from './store/balances-store';
import { useSystemCurrencyStore } from './store/system-currency-store';
import { useTimeframeStore } from './store/timeframe-store';

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
            <Route index element={<UIMain />} />
            <Route path='label-customize' element={<CustomizeLabel />} />
            <Route path='deposit-token-select' element={<UIDepositTokenSelect />} />
            <Route path='deposit-network-select' element={<UIDepositNetworkSelect />} />
            <Route path='deposit' element={<UIDeposit />} />
            <Route path='withdraw-token-select' element={<UIWithdrawTokenSelect />} />
            <Route path='withdraw-network-select' element={<UIWithdrawNetworkSelect />} />
            <Route path='withdraw' element={<UIWithdraw />} />
            <Route path='analytics' element={<UIAnalytics />} />
            <Route path='asset/:asset' element={<UIAsset />} />
            <Route path='swap' element={<UISwap />} />
            <Route path='swap-token-select/:type' element={<UISwapTokenSelectScreen />} />
          </Route>

          <Route
            path='welcome'
            element={
              <PublicRoute>
                <UIWelcome />
              </PublicRoute>
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

          <Route path='*' element={<NoMatch />} />
        </Routes>
      </Router>
    </Theme>
  );
}

function Layout() {
  const timeframe = useTimeframeStore((state) => state.balanceTimeframe);
  const balances = useBalances(timeframe);
  const setBalances = useBalancesStore((state) => state.setBalances);
  const setBalancesLoading = useBalancesStore((state) => state.setBalancesLoading);
  const balancesLoadingRef = useRef(true);
  const systemRates = useSystemRates();
  const setRates = useSystemCurrencyStore((state) => state.setRates);
  const setCurrencyLoading = useSystemCurrencyStore((state) => state.setCurrencyLoading);
  const currencyLoadingRef = useRef(true);

  useEffect(() => {
    balancesLoadingRef.current = true;
  }, [timeframe]);

  useEffect(() => {
    if (balancesLoadingRef.current || !balances.isLoading) {
      setBalancesLoading(balances.isLoading);
      balancesLoadingRef.current = balances.isLoading;
    }
  }, [balances.isLoading]);

  useEffect(() => {
    if (balances.data && balances.isSuccess) {
      setBalances(balances.data);
    }
  }, [balances.data, balances.isSuccess]);

  useEffect(() => {
    if (currencyLoadingRef.current || !systemRates.isLoading) {
      setCurrencyLoading(systemRates.isLoading);
      currencyLoadingRef.current = systemRates.isLoading;
    }
  }, [systemRates.isLoading]);

  useEffect(() => {
    if (systemRates.data && systemRates.isSuccess) {
      setRates(systemRates.data);
    }
  }, [systemRates.data, systemRates.isSuccess]);

  return (
    <>
      <Outlet />
      <BackSwipe />
    </>
  );
}

function NoMatch() {
  return (
    <Flex height='100vh' width='100vw' direction='column' justify='center' align='center'>
      <Heading as='h2'>Nothing to see here!</Heading>
      <Text as='p'>
        <Link to='/'>Go to the home page</Link>
      </Text>
    </Flex>
  );
}

export default App;
