import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LangProvider } from './lib/LangProvider';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter-tight/latin-500.css';
import '@fontsource/inter-tight/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
);
