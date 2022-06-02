import Head from 'next/head'
import { GuestGuard } from 'src/components/authentication/guest-guard'
import SignIn from 'src/modules/authentication/singin'

const SignInPage = () => {
  return (
    <GuestGuard>
      <Head>
        <title>Zporter - Sign in or Sign up</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SignIn />
    </GuestGuard>
  )
}

export default SignInPage
