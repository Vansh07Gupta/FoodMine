import { useEffect } from "react"
import AppRoutes from "./AppRoutes"
import Header from "./components/Header"
import { useLoading } from "./hooks/useLoading"
import setLoadingInterceptor from "./interceptors/loadingInterceptors"

function App() {

  const {showLoading,hideLoading} = useLoading();

  useEffect(() => {
    setLoadingInterceptor({showLoading,hideLoading})
  },[]);

  return (
    <>
    <Header>
    </Header>
    <AppRoutes/>
    </>
  ) 
}

export default App
