import { LayoutSignupForm } from 'src/components/layout-update-profile'
import SignUpForm from 'src/modules/authentication/update-profile'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { requireAuth } from 'src/config/firebase-admin'
import { GuestGuard } from 'src/components/authentication/guest-guard'
import { AuthGuard } from 'src/components/authentication/auth-guard'

const SignUpFormPage = () => {
  const router = useRouter()
  return (
    <AuthGuard>
      <LayoutSignupForm authen>
        <Head>
          <title>Zporter</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <SignUpForm title="Update your profile" />
      </LayoutSignupForm>
    </AuthGuard>
  )
}

export default SignUpFormPage
