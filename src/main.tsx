import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { RefineThemes } from '@refinedev/antd'
import 'antd/dist/reset.css'
import '@refinedev/antd/dist/reset.css'
import './index.css'
import App from './App.tsx'
import { PasswordProtect } from './components/PasswordProtect'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={RefineThemes.Blue}>
      <PasswordProtect>
        <App />
      </PasswordProtect>
    </ConfigProvider>
  </StrictMode>,
)
