import Head from 'next/head'
import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import { requireNotAuth } from 'src/config/firebase-admin'
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

export const getServerSideProps: any = async ({ req, res }) => {
  await requireNotAuth(req as any, res as any)
  return { props: {} }
}
