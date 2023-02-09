import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import AuthContext from '@/authContextProvider/AuthContext';
import PrivateRoutes from '@/components/PrivateRoutes';

if (typeof window !== 'undefined') {
  var item = localStorage.getItem('task')
}

export default function App({ Component, pageProps }) {

  const [isAuth, setAuth] = useState(!!item)
  const [token, setToken] = useState(item)

  return <>
    <AuthContext.Provider value={{ isAuth, setAuth, token, setToken }}>
      <PrivateRoutes>
        <ToastContainer />
        <Component {...pageProps} />
      </PrivateRoutes>
    </AuthContext.Provider>
  </>
}
