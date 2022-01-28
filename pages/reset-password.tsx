import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { useAuth } from 'module/authen/auth/AuthContext'
import ResetPassword from 'module/authen/reset-password'
import Head from 'next/head'
import { useRouter } from 'next/router'

const ResetPasswordPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  if (!!currentUser) {
    router.push('/feed')
    return null
  }
  return (
    <LayoutLanding authen>
      <Head>
        <title>Zporter</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ResetPassword />
    </LayoutLanding>
  )
}

export default ResetPasswordPage
