import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { requireNotAuth } from 'config/firebase-admin'
import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { useAuth } from 'module/authen/auth/AuthContext'
import SignIn from 'module/authen/singin'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LOCAL_STORAGE_KEY } from 'constants/constants'

const SignInPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()

  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.currentRoleId)
    localStorage.removeItem(LOCAL_STORAGE_KEY.userRoles)
  }, [])

  return (
    <LayoutLanding authen>
      <Head>
        <title>Zporter Signin</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <SignIn />
    </LayoutLanding>
  )
}

export default SignInPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireNotAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
