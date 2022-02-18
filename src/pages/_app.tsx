import type { EmotionCache } from '@emotion/cache'
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
import { Provider as ReduxProvider } from 'react-redux'
import { AuthConsumer, AuthProvider } from 'src/module/authen/auth/AuthContext'
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
import { QueryParamProvider } from 'src/components/QueryParamsProvider'

type EnhancedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const clientSideEmotionCache = createEmotionCache()

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    gtm.initialize(gtmConfig)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Zporter</title>
        <meta name="title" content="Zporter" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Zporter" />
        <meta name="keywords" content="zporter" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="Zporter" />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <QueryParamProvider>
              <SettingsProvider>
                <SettingsConsumer>
                  {({ settings }) => (
                    <ThemeProvider
                      theme={createTheme({
                        direction: settings.direction,
                        responsiveFontSizes: settings.responsiveFontSizes,
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
                              getLayout(<Component {...pageProps} />)
                            )
                          }}
                        </AuthConsumer>
                      </RTL>
                    </ThemeProvider>
                  )}
                </SettingsConsumer>
              </SettingsProvider>
            </QueryParamProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  )
}

export default App
