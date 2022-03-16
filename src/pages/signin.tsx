import Head from 'next/head'
import { GuestGuard } from 'src/components/authentication/guest-guard'
import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import SignIn from 'src/module/authen/singin'

const SignInPage = () => {
  // useEffect(() => {
  //   localStorage.removeItem(LOCAL_STORAGE_KEY.userRoles)
  // }, [])

  return (
    <GuestGuard>
      <LayoutLanding authen>
        <Head>
          <title>Zporter Signin</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <SignIn />
      </LayoutLanding>
    </GuestGuard>
  )
}

export default SignInPage
