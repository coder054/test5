import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import { LayoutSignupForm } from 'src/components/layout-update-profile'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { SignUpFormPlayer } from 'src/module/authen/update-profile-player'
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
