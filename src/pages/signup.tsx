import Head from 'next/head'
import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import { SignUp } from 'src/modules/authentication/signup/signup'

export default function () {
  return (
    <LayoutLanding authen>
      <Head>
        <title>Zporter - Sign in or Sign up</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SignUp />
    </LayoutLanding>
  )
}
