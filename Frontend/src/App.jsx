import { useEffect } from "react"
import AppRoutes from "./AppRoutes.jsx"
import Header from "./components/Header.jsx"
import { useLoading } from "./hooks/useLoading.jsx"
import setLoadingInterceptor from "./interceptors/loadingInterceptors.js"

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
