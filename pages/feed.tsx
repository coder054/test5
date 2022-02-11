import { Sidebar } from 'components/Sidebar'
import { vercelImg } from 'imports/images'
import type {
  GetServerSideProps,
  NextApiRequest,
  NextApiResponse,
  NextPage,
} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Tabs } from 'components/Tabs'
import { FootballersSlider } from 'components/Feed/FootballersSlider/FootballersSlider'
import { ROUTES } from 'constants/constants'
import { loadIdToken, requireAuth } from 'config/firebase-admin'

enum Tab {
  Friends = 'Friends',
  News = 'News',
  Diary = 'Diary',
}

const tabs = [{ text: Tab.Friends }, { text: Tab.News }, { text: Tab.Diary }]

const Feed = () => {
  const [tab, setTab] = useState(Tab.Diary)

  useEffect(() => {
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
    console.log('version 1.1')
  }, [])

  return (
    <Layout title="Zporter">
      {/* /// tabs */}
      <Tabs tab={tab} setTab={setTab} tabs={tabs} />

      <FootballersSlider />

      <div className="flex space-x-3 items-end ">
        <span className="font-semibold text-Green text-[24px] leading-[138%] ">
          Positive list
        </span>
        <span className="text-Grey font-medium text-[16px] leading-[175%] ">
          65 Results
        </span>
      </div>
    </Layout>
  )
}

export default Feed

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
