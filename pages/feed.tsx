import { Sidebar } from 'components/Sidebar'
import { vercelImg } from 'imports/images'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { useState } from 'react'
import clsx from 'clsx'
import { Tabs } from 'components/Tabs'
import { FootballersSlider } from 'components/Feed/FootballersSlider/FootballersSlider'

enum Tab {
  Friends = 'Friends',
  News = 'News',
  Diary = 'Diary',
}

const tabs = [{ text: Tab.Friends }, { text: Tab.News }, { text: Tab.Diary }]

const Feed = () => {
  const [tab, setTab] = useState(Tab.Diary)

  return (
    <Layout>
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
