import { Layout } from 'components/Layout'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Tabs } from 'components/Tabs'
import { CardNews } from 'components/card-news'
import { axios } from 'utils/axios'
import { Loading } from 'components/loading/loading'
import { NewsType } from 'constants/types'
import { notification } from 'antd'

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
  const [loading, setLoading] = useState<boolean>(true)
  const [news, setNews] = useState<NewsType[]>([])

  useEffect(() => {
    const getNews = async () => {
      try {
        const resNews = await axios.get(
          '/feed/get-list-news-post?limit=20&sorted=asc'
        )
        setLoading(false)
        setNews(resNews.data)
      } catch (error) {}
    }

    getNews()
  }, [])

  const handleFavorite = async (
    postId: string,
    typeOfPost: string,
    status: string
  ) => {
    const response = await axios.post(
      `/feed/like-post?postId=${postId}&typeOfPost=${typeOfPost}&query=${status}`
    )
    if (response.status === 201) {
      notification.open({
        message: '',
        description: 'Like successfully.',
        style: {
          backgroundColor: '#09E099',
          color: '#FFFFFF',
        },
        duration: 3,
      })

      const newsCopy = JSON.parse(JSON.stringify(news))

      newsCopy.forEach((item: NewsType) => {
        if (item.postId === postId) {
          item.isLiked = true
          item.countLikes = (item.countLikes || 0) + 1
        }
      })
      setNews(newsCopy)
    }
  }
  // console.log('news', news)

  return (
    <div className="w-full">
      <Tabs tab={tab} setTab={setTab} tabs={tabs} />
      {loading && (
        <div className="w-[48px] m-auto">
          <Loading />
        </div>
      )}
      <div className="grid grid-cols-4 gap-10 pr-[40px]">
        {!loading && news ? (
          news.map((item: NewsType, index) => (
            <div key={index} className="">
              <CardNews card={item} handleFavorite={handleFavorite} />
            </div>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  )
}

export default News
