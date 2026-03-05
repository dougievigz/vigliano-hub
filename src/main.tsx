import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PasswordProtect } from './components/PasswordProtect'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PasswordProtect>
      <App />
    </PasswordProtect>
  </StrictMode>,
)
