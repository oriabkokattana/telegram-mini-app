import { useEffect } from 'react';
import { Toaster } from 'sonner';
// import { WagmiProvider } from 'wagmi';
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import ErrorBoundaryPlaceholder from './modules/core/components/ErrorBoundary';
// import { config } from './utils/config';
import App from './App';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

function Root() {
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
        {/* <WagmiProvider config={config}> */}
        <QueryClientProvider client={queryClient}>
          {/* <RainbowKitProvider> */}
          <App />
          <Toaster
            richColors
            closeButton
            position='top-center'
            duration={5000}
            toastOptions={{
              classNames: {
                success: 'toaster-success',
                warning: 'toaster-warning',
                info: 'toaster-info',
                error: 'toaster-error',
              },
            }}
          />
          {/* <ReactQueryDevtools initialIsOpen={false} position='bottom' /> */}
          {/* </RainbowKitProvider> */}
        </QueryClientProvider>
        {/* </WagmiProvider> */}
      </SDKProvider>
    </ErrorBoundaryPlaceholder>
  );
}

export default Root;
