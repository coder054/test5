import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { LayoutSignupForm } from 'components/layout-signup-form'
import { useAuth } from 'module/authen/auth/AuthContext'
import { SignUpFormPlayer } from 'module/authen/signup-form-player'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SignUpWithInvitationPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  // if (!!currentUser) {
  //   router.push('/feed')
  //   return null
  // }
  return (
    <LayoutSignupForm authen>
      <Head>
        <title>Signup form player</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SignUpFormPlayer />
    </LayoutSignupForm>
  )
}

export default SignUpWithInvitationPage
