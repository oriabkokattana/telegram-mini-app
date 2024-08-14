import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import ErrorBoundaryPlaceholder from './modules/core/components/ErrorBoundary';
import Root from './Root';

import '@radix-ui/themes/styles.css';

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <Theme appearance='dark' radius='medium'>
            <Root />
          </Theme>
          <Toaster richColors position='top-center' />
          <ReactQueryDevtools initialIsOpen={false} position='bottom' />
        </QueryClientProvider>
      </SDKProvider>
    </ErrorBoundaryPlaceholder>
  );
}

export default App;
