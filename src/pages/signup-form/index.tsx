import { LayoutSignupForm } from 'src/components/layout-signup-form'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import SignUpForm from 'src/module/authen/signup-form'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from 'src/config/firebase-admin'
import { GuestGuard } from 'src/components/authentication/guest-guard'

const SignUpWithInvitationPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  // if (!!currentUser) {
  //   router.push('/feed')
  //   return null
  // }
  return (
    <GuestGuard>
      <LayoutSignupForm authen>
        <Head>
          <title>Zporter</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <SignUpForm />
      </LayoutSignupForm>
    </GuestGuard>
  )
}

export default SignUpWithInvitationPage
