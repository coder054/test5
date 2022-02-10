// import { useEffect } from 'react'

// export default function Index() {
//   useEffect(() => {
//     if (typeof window === 'undefined') {
//       return
//     }
//     window.document.location = '/feed'
//   }, [])
//   return null
// }

import Head from 'next/head'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { requireNotAuth } from 'config/firebase-admin'
import Landing from 'module/landing'
import { useAuth } from 'module/authen/auth/AuthContext'
import { useRouter } from 'next/router'

const LandingPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()

  return (
    <>
      <Head>
        <title>Zporter</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Landing />
    </>
  )
}

export default LandingPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireNotAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
