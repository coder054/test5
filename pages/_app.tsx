// import 'antd/dist/antd.css'
import Router from 'next/router'
import nProgress from 'nprogress'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthConsumer, AuthProvider } from 'module/authen/auth/AuthContext'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'jotai'
import { QueryParamProvider } from 'components/QueryParamsProvider'
import { FC, useEffect } from 'react'
import { NextPage } from 'next'
import { EmotionCache } from '@emotion/react'
import { createEmotionCache } from 'utils/utils'
import { SplashScreen } from 'components/SplashScreen'
import dynamic from 'next/dynamic'

type EnhancedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

// Router.events.on('routeChangeStart', nProgress.start)
// Router.events.on('routeChangeError', nProgress.done)
// Router.events.on('routeChangeComplete', nProgress.done)

const clientSideEmotionCache = createEmotionCache()

const MyApp: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  //@ts-ignore: Unreachable code error
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    Router.events.on('routeChangeStart', nProgress.start)
    Router.events.on('routeChangeError', nProgress.done)
    Router.events.on('routeChangeComplete', nProgress.done)
  }, [])

  return (
    <QueryParamProvider>
      <AuthProvider>
        <CookiesProvider>
          <Provider>
            <AuthConsumer>
              {(auth) =>
                !auth.isInitialized ? (
                  <SplashScreen />
                ) : (
                  getLayout(<Component {...pageProps} />)
                )
              }
            </AuthConsumer>
          </Provider>
        </CookiesProvider>
      </AuthProvider>
    </QueryParamProvider>
  )
}

export default MyApp
