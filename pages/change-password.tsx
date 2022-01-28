import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { useAuth } from 'module/authen/auth/AuthContext'
import ChangePassword from 'module/authen/change-password'
import Head from 'next/head'
import { useRouter } from 'next/router'

const OtpCodePage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  if (!!currentUser) {
    router.push('/feed')
    return null
  }
  return (
    <LayoutLanding>
      <Head>
        <title>Zporter</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ChangePassword />
    </LayoutLanding>
  )
}

export default OtpCodePage
