// import 'antd/dist/antd.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'module/authen/auth/AuthContext'
import { CookiesProvider } from 'react-cookie'
import { QueryParamProvider } from 'components/QueryParamsProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider>
      <AuthProvider>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </AuthProvider>
    </QueryParamProvider>
  )
}

export default MyApp
