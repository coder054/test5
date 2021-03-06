import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import { LayoutSignupForm } from 'src/components/layout-update-profile'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SignUpFormCoach } from 'src/modules/authentication/update-profile-coach'

const SignUpWithInvitationPage = () => {
  return (
    <LayoutSignupForm authen coach>
      <Head>
        <title>Signup form coach</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SignUpFormCoach />
    </LayoutSignupForm>
  )
}

export default SignUpWithInvitationPage
