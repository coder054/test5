import Head from 'next/head'
import { useRouter } from 'next/router'
import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import { requireNotAuth } from 'src/config/firebase-admin'
import { SignUp } from 'src/module/authen/signup/signup'

export default function () {
  const router = useRouter()
  return (
    <LayoutLanding authen>
      <Head>
        <title>Zporter</title>
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
