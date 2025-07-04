import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StorageRecordProvider } from './components/Provider/StorageRecordProvider.tsx'
import { storage } from './localStorage/localStorage.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StorageRecordProvider data={storage.get() ?? []}>
      <App />
    </StorageRecordProvider>
  </StrictMode>,
)
