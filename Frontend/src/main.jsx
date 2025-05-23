import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './hooks/useCart'
import { AuthProvider } from './hooks/useAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './hooks/useLoading'
import './interceptors/authInterceptor'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <LoadingProvider>
    <AuthProvider>
    <CartProvider>
        <App/>
        <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
    </CartProvider>
    </AuthProvider>
    </LoadingProvider>


    
    </BrowserRouter>
)
