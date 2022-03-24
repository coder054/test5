import Head from 'next/head'
import { GuestGuard } from 'src/components/authentication/guest-guard'
import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import { requireNotAuth } from 'src/config/firebase-admin'
import SignIn from 'src/module/authen/singin'

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Zporter Signin</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SignIn />
    </>
  )
}

export default SignInPage
export const getServerSideProps: any = async ({ req, res }) => {
  await requireNotAuth(req as any, res as any)
  return { props: {} }
}
