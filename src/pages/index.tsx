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
//
import { useRouter } from 'next/router'
import { requireNotAuth } from 'src/config/firebase-admin'
import Landing from 'src/module/landing'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { GuestGuard } from 'src/components/authentication/guest-guard'

const LandingPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()

  return (
    <GuestGuard>
      <Head>
        <title>Zporter</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Landing />
    </GuestGuard>
  )
}

export default LandingPage
