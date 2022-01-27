import { Layout } from 'components/Layout'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Tabs } from 'components/Tabs'
import { CardNews } from 'components/CardNews'
import { axios } from 'utils/axios'

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
  const [news, setNews] = useState([])

  useEffect(() => {
    const getNews = async () => {
      try {
        const resRole = await axios.get(
          'https://dev.api.zporter.co/users/user-roles'
        )
        console.log('res', resRole.data[0].roleId)
        const resNews = await axios.get(
          `https://dev.api.zporter.co/feed/get-list-news-post?limit=10&sorted=asc`,
          { params: { roleId: resRole.data[0].roleId } }
        )
        console.log('resNews', resNews)
      } catch (error) {}
    }

    getNews()
  }, [])

  return (
    <>
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
    </>
  )
}

export default News
