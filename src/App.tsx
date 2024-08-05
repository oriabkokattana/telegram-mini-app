import { useEffect } from 'react';
import { Theme } from '@radix-ui/themes';
import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import ErrorBoundaryPlaceholder from './modules/core/components/ErrorBoundary';
import Root from './Root';

import '@radix-ui/themes/styles.css';

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
        <Theme appearance='dark' radius='medium'>
          <Root />
        </Theme>
      </SDKProvider>
    </ErrorBoundaryPlaceholder>
  );
}

export default App;
