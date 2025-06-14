import { Navigate,useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth.jsx"

const AuthRoute = ({children}) => {
    const location = useLocation();
    const {user} = useAuth();   
  return user ? (
    children
  ) : (
    <Navigate to = {`/login?returnUrl=${location.pathname}`}/>
  )
}

export default AuthRoute