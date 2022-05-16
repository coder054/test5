import Head from 'next/head'
import { Landing } from 'src/modules/landing-page/LandingPage'

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
