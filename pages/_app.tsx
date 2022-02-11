// import 'antd/dist/antd.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'module/authen/auth/AuthContext'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'jotai'
import { QueryParamProvider } from 'components/QueryParamsProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider>
      <AuthProvider>
        <CookiesProvider>
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </CookiesProvider>
      </AuthProvider>
    </QueryParamProvider>
  )
}

export default MyApp
