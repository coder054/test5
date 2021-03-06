import type { EmotionCache } from '@emotion/cache'
import { useState } from 'react'
import { CacheProvider } from '@emotion/react'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import nProgress from 'nprogress'
import type { FC } from 'react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { InitFCM } from 'src/components/noti/InitFCM'
import { QueryParamProvider } from 'src/components/QueryParamsProvider'
import {
  AuthConsumer,
  AuthProvider,
} from 'src/modules/authentication/auth/AuthContext'
import { RTL } from '../components/rtl'
import { SplashScreen } from '../components/splash-screen'
import { gtmConfig } from '../config'
import {
  SettingsConsumer,
  SettingsProvider,
} from '../contexts/settings-context'
import '../i18n'
import { gtm } from '../lib/gtm'
import { store } from '../store'
import '../styles/globals_compiled.css'
import { createTheme } from '../theme'
import { createEmotionCache } from '../utils/create-emotion-cache'
import { get, isEmpty } from 'lodash'

type EnhancedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const clientSideEmotionCache = createEmotionCache()

const App: FC<EnhancedAppProps> = (props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    gtm.initialize(gtmConfig)
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Zporter</title>
        <meta name="description" content="Zporter"></meta>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zporter" />
        <meta property="og:description" content="Zporter" />
        {/* <meta
          property="og:image"
          content="https://www.byeindonesia.com/og-bye-indonesia.png"
        /> */}
      </Head>
      <CacheProvider value={emotionCache}>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <AuthProvider>
                  <QueryParamProvider>
                    <SettingsProvider>
                      <SettingsConsumer>
                        {(data) => {
                          const settings: any = isEmpty(get(data, 'settings'))
                            ? {}
                            : get(data, 'settings')

                          return (
                            <ThemeProvider
                              theme={createTheme({
                                direction: settings.direction,
                                responsiveFontSizes:
                                  settings.responsiveFontSizes,
                                mode: settings.theme,
                              })}
                            >
                              <RTL direction={settings.direction}>
                                <CssBaseline />
                                <Toaster position="top-center" />
                                {/* <SettingsButton /> */}
                                {/* {getLayout(<Component {...pageProps} />)} */}
                                <AuthConsumer>
                                  {(auth) => {
                                    return !auth.initialized ? (
                                      <SplashScreen />
                                    ) : (
                                      <>
                                        <InitFCM
                                          token={auth.token}
                                          currentRoleId={auth.currentRoleId}
                                        ></InitFCM>
                                        {getLayout(
                                          <Component {...pageProps} />
                                        )}
                                      </>
                                    )
                                  }}
                                </AuthConsumer>
                                <ToastContainer
                                  position="top-right"
                                  autoClose={4000}
                                  hideProgressBar={false}
                                  newestOnTop={false}
                                  draggable={false}
                                  closeOnClick
                                  pauseOnHover
                                />
                              </RTL>
                            </ThemeProvider>
                          )
                        }}
                      </SettingsConsumer>
                    </SettingsProvider>
                  </QueryParamProvider>
                </AuthProvider>
              </LocalizationProvider>
            </Hydrate>
          </QueryClientProvider>
        </ReduxProvider>
      </CacheProvider>
    </>
  )
}

export default App
