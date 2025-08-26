import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/normalize.css';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
