import { LayoutLanding } from 'src/components/layout-landing/layout-landing'

import { requireNotAuth } from 'src/config/firebase-admin'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import ChangePassword from 'src/module/authen/change-password'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GuestGuard } from 'src/components/authentication/guest-guard'

const OtpCodePage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
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
