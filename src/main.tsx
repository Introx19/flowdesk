import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SettingsProvider } from './contexts/SettingsContext.tsx'
import { ModalProvider } from './contexts/ModalContext.tsx'

// Expose React globally for dynamically loaded plugins
(window as any).React = React;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </SettingsProvider>
  </StrictMode>,
)
