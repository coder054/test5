import { Sidebar } from 'components/Sidebar'
import { vercelImg } from 'imports/images'
import type { NextPage } from 'next'
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
import { CardNews } from 'components/CardNews'

enum Tab {
  TopStories = 'TopStories',
  Latest = 'Latest',
  Zportster = 'Zportster',
  Leaderbords = 'Leaderbords',
  Test = 'Test',
}

const tabs = [
  { text: Tab.TopStories },
  { text: Tab.Latest },
  { text: Tab.Zportster },
  { text: Tab.Leaderbords },
  { text: Tab.Test },
]

const News = () => {
  const [tab, setTab] = useState(Tab.Latest)

  return (
    <Layout title="Zporter">
      {/* /// tabs */}
      <Tabs tab={tab} setTab={setTab} tabs={tabs} />
      <div className="grid grid-cols-4 gap-1">
        <div className="mt-[32px]">
          <CardNews />
        </div>
        <div className="mt-[32px]">
          <CardNews />
        </div>
        <div className="mt-[32px]">
          <CardNews />
        </div>
        <div className="mt-[32px]">
          <CardNews />
        </div>
        <div className="mt-[32px]">
          <CardNews />
        </div>
        <div className="mt-[32px]">
          <CardNews />
        </div>
      </div>
    </Layout>
  )
}

export default News
