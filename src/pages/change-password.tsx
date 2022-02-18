import { LayoutLanding } from 'src/components/layout-landing/layout-landing'

import { requireNotAuth } from 'src/config/firebase-admin'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import ChangePassword from 'src/module/authen/change-password'
import Head from 'next/head'
import { useRouter } from 'next/router'

const OtpCodePage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  return (
    <LayoutLanding>
      <Head>
        <title>Zporter</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ChangePassword />
    </LayoutLanding>
  )
}

export default OtpCodePage

export const getServerSideProps: any = async ({ req, res }) => {
  await requireNotAuth(req as any, res as any)
  return { props: {} }
}
