import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import { LayoutSignupForm } from 'src/components/layout-signup-form'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SignUpFormCoach } from 'src/module/authen/signup-form-coach'

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
