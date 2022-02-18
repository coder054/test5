import { Sidebar } from 'src/components/Sidebar'
import { vercelImg } from 'src/imports/images'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from 'src/components/Header'
import { Layout } from 'src/components/Layout'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Tabs } from 'src/components/Tabs'
import { FootballersSlider } from 'src/components/Feed/FootballersSlider/FootballersSlider'
import { ROUTES } from 'src/constants/constants'
import { loadIdToken, requireAuth } from 'src/config/firebase-admin'

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
    console.log('version 1.3')
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

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}
