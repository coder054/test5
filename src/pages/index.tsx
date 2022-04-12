import Head from 'next/head'
import { GuestGuard } from 'src/components/authentication/guest-guard'
import { Landing } from 'src/modules/landing-page/LandingPage'

const LandingPage = () => {
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
