import Head from 'next/head'
import { GuestGuard } from 'src/components/authentication/guest-guard'
import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import ResetPassword from 'src/modules/authentication/reset-password'

const ForgotPassword = () => {
  return (
    <GuestGuard>
      <Head>
        <title>Zporter</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ResetPassword />
    </GuestGuard>
  )
}

export default ForgotPassword
