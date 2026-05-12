import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { clarity } from 'react-microsoft-clarity';
import App from './App.tsx';
import './index.css';

if (import.meta.env.VITE_CLARITY_ID) {
  clarity.init(import.meta.env.VITE_CLARITY_ID);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
