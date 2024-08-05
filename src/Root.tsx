import { useEffect, useMemo } from 'react';
import { Outlet, Route, Router, Routes } from 'react-router-dom';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
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
import Landing from '@/modules/landing/components/Landing';
import Profile from '@/modules/profile/components/Profile';
import Trading from '@/modules/trading/components/Trading';

import '@radix-ui/themes/styles.css';

function Root() {
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
          <Route path='profile' element={<Profile />} />
          <Route path='trading' element={<Trading />} />

          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
    <Flex
      width='100vw'
      minHeight='100vh'
      justify='center'
      align='center'
      style={{ backgroundColor: 'var(--gray-2)' }}
    >
      <Outlet />
    </Flex>
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

export default Root;
