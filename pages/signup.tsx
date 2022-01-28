import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { useAuth } from 'module/authen/auth/AuthContext'
import { SignUpWithSMS } from 'module/authen/signup/signup'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SignUpPage = () => {
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
      <SignUpWithSMS />
    </LayoutLanding>
  )
}

export default SignUpPage
