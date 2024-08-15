import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { WagmiProvider } from 'wagmi';
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains';
import { Theme } from '@radix-ui/themes';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import ErrorBoundaryPlaceholder from './modules/core/components/ErrorBoundary';
import Root from './Root';

import '@rainbow-me/rainbowkit/styles.css';
import '@radix-ui/themes/styles.css';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'Kattana Broker',
  appUrl: 'https://telegram-mini-app-delta-sooty.vercel.app/',
  appDescription: 'broker',
  projectId: '1feba9274f57a2b9d18578ca7ef5c715',
  chains: [mainnet, polygon, optimism, arbitrum, base],
});

function App() {
  const debug = useLaunchParams().startParam === 'debug';

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <ErrorBoundaryPlaceholder>
      <SDKProvider acceptCustomStyles debug={debug}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Theme appearance='dark' radius='medium'>
                <Root />
                <Toaster richColors position='top-center' />
                <ReactQueryDevtools initialIsOpen={false} position='bottom' />
              </Theme>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </SDKProvider>
    </ErrorBoundaryPlaceholder>
  );
}

export default App;
