// import 'antd/dist/antd.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'module/authen/auth/AuthContext'
import { CookiesProvider } from 'react-cookie'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </AuthProvider>
  )
}

export default MyApp
