import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  // App being loaded into DOM
  <StrictMode>
    <App />
  </StrictMode>
);
