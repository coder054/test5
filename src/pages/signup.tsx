import { requireNotAuth } from 'src/config/firebase-admin'
import { LayoutLanding } from 'src/components/layout-landing/layout-landing'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { SignUpWithSMS } from 'src/module/authen/signup/signup'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SignUpPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  return (
    <LayoutLanding authen>
      <Head>
        <title>Zporter</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SignUpWithSMS />
    </LayoutLanding>
  )
}

export default SignUpPage

export const getServerSideProps: any = async ({ req, res }) => {
  await requireNotAuth(req as any, res as any)
  return { props: {} }
}
