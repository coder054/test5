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

import Landing from 'module/landing'

const LandingPage = () => {
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
