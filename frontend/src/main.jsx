import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UsercontextProvider } from './context/User.context.jsx'


export const server="http://localhost:8000"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsercontextProvider>
           <App />
    </UsercontextProvider>
    
  </StrictMode>,
)
