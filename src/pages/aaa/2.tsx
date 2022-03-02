import axiosLib from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo } from 'react'
import { getStr } from 'src/utils/utils'

//@ts-ignore: Unreachable code error
const Overview: NextPage = ({ data }) => {
  const title = useMemo(() => {
    return getStr(data, 'title')
  }, [data])

  const img = useMemo(() => {
    if (!data) {
      return ''
    }
    return 'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2021-11-09%2013%3A10%3A30.079838?alt=media&token=c1c1a852-95b0-48c7-a92b-c91a8f3c46e9'
  }, [data])

  return (
    <>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>{title}</title>
        <meta
          name="description"
          content="Renunciation of Indonesian citizenship process changed in 2020. This site aims to answer all your questions on the new process."
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.byeindonesia.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Renunciation of Indonesian citizenship process changed in 2020. This site aims to answer all your questions on the new process."
        />
        <meta
          property="og:image"
          content="https://www.byeindonesia.com/og-bye-indonesia.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="byeindonesia.com" />
        <meta property="twitter:url" content="https://www.byeindonesia.com/" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content="Renunciation of Indonesian citizenship process changed in 2020. This site aims to answer all your questions on the new process."
        />
        <meta
          name="twitter:image"
          content="https://www.byeindonesia.com/og-bye-indonesia.png"
        />

        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
      </Head>

      <h1 className="text-red-500">aaa2</h1>
    </>
  )
}

export default Overview

export const getServerSideProps: any = async ({ req, res }) => {
  //@ts-ignore: Unreachable code error
  const { data } = await axiosLib.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  )
  return { props: { data } }
}
