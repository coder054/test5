import Head from 'next/head'
import { useRouter } from 'next/router'
import { GuestGuard } from 'src/components/authentication/guest-guard'
import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import ResetPassword from 'src/modules/authentication/reset-password'

const ResetPasswordPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  return (
    <GuestGuard>
      <LayoutLanding authen>
        <Head>
          <title>Zporter</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <ResetPassword />
      </LayoutLanding>
    </GuestGuard>
  )
}

export default ResetPasswordPage
