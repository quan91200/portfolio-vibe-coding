import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/i18n'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { BackgroundProvider } from './context/BackgroundContext'
import { SettingsProvider } from './context/SettingsContext'
import { ToastProvider } from './context/ToastContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <BackgroundProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BackgroundProvider>
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>,
)
