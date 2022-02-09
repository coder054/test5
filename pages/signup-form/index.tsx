import { LayoutSignupForm } from 'components/layout-signup-form'
import { useAuth } from 'module/authen/auth/AuthContext'
import SignUpForm from 'module/authen/signup-form'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SignUpWithInvitationPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  if (!!currentUser) {
    router.push('/feed')
    return null
  }
  return (
    <LayoutSignupForm authen>
      <Head>
        <title>Zporter</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SignUpForm />
    </LayoutSignupForm>
  )
}

export default SignUpWithInvitationPage
