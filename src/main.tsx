import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import './mockEnv.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
