import type { NextPage } from 'next'
import Head from 'next/head'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const Overview: NextPage = () => {
  return <h1 className="text-white">aaa</h1>
}

Overview.getLayout = (page) => {
  return (
    <AuthGuard>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>
          Bye Indonesia - Renunciation of Indonesian Citizenship Guide 2021
        </title>
        <meta
          name="description"
          content="Renunciation of Indonesian citizenship process changed in 2020. This site aims to answer all your questions on the new process."
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.byeindonesia.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Bye Indonesia - Renunciation of Indonesian Citizenship Guide 2021"
        />
        <meta
          property="og:description"
          content="Renunciation of Indonesian citizenship process changed in 2020. This site aims to answer all your questions on the new process."
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2021-11-09%2013%3A10%3A30.079838?alt=media&token=c1c1a852-95b0-48c7-a92b-c91a8f3c46e9"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="byeindonesia.com" />
        <meta property="twitter:url" content="https://www.byeindonesia.com/" />
        <meta
          name="twitter:title"
          content="Bye Indonesia - Renunciation of Indonesian Citizenship Guide 2021"
        />
        <meta
          name="twitter:description"
          content="Renunciation of Indonesian citizenship process changed in 2020. This site aims to answer all your questions on the new process."
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2021-11-09%2013%3A10%3A30.079838?alt=media&token=c1c1a852-95b0-48c7-a92b-c91a8f3c46e9"
        />

        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
      </Head>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}

export default Overview
