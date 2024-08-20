/* eslint-disable simple-import-sort/imports */
import React from 'react';
import ReactDOM from 'react-dom/client';

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import './mockEnv.ts';
import './polyfill.ts';

import Root from './Root.tsx';

import '@rainbow-me/rainbowkit/styles.css';
import '@radix-ui/themes/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
