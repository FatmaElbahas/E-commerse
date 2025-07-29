import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fontsource/poppins';
import './index.css'
import App from './App.jsx'

// ⬇️ React Query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ⬇️ إنشاء client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)