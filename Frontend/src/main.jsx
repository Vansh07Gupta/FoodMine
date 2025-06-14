import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './hooks/useCart.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './hooks/useLoading.jsx'
import './interceptors/authInterceptor.js'

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
