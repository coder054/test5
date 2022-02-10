import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { requireNotAuth } from 'config/firebase-admin'
import { useAuth } from 'module/authen/auth/AuthContext'
import ChangePassword from 'module/authen/change-password'
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireNotAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
