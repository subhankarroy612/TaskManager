import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import authContextProvider from '../authContextProvider/authContextProvider.js'

export default function App({ Component, pageProps }) {
  return <>
    <authContextProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </authContextProvider>
  </>
}
