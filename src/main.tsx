import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StorageRecordProvider } from './components/Provider/StorageRecordProvider.tsx'
import { storage } from './localStorage/localStorage.ts'

console.debug('STORAGE', STORAGE);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StorageRecordProvider data={STORAGE === "storage" ? storage.get() ?? [] : []}>
      <App />
    </StorageRecordProvider>
  </StrictMode>,
)
