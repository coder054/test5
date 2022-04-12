import Head from 'next/head'
import { GuestGuard } from 'src/components/authentication/guest-guard'
import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import ChangePassword from 'src/modules/authentication/change-password'

const OtpCodePage = () => {
  return (
    <GuestGuard>
      <LayoutLanding>
        <Head>
          <title>Zporter</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <ChangePassword />
      </LayoutLanding>
    </GuestGuard>
  )
}

export default OtpCodePage
