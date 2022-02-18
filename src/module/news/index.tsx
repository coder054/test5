import { CardNews } from 'src/components/card-news'
import { Loading } from 'src/components/loading/loading'
import { Tabs } from 'src/components/Tabs'
import { API_GET_LIST_NEWS_POST, API_LIKE_POST } from 'src/constants/api.constants'
import { NewsType } from 'src/constants/types'
import { useEffect, useState } from 'react'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

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
  const params = {
    limit: 12,
    sorted: 'asc',
  }

  useEffect(() => {
    const getNews = async () => {
      try {
        const resNews = await axios.get(
          toQueryString(API_GET_LIST_NEWS_POST, params)
        )
        setLoading(false)
        setNews(resNews.data)
      } catch (error) {}
    }
    getNews()
  }, [])

  const handleFavorite = async (id: string, type: string, status: string) => {
    const res = await axios.post(
      toQueryString(API_LIKE_POST, {
        postId: id,
        typeOfPost: type,
        query: status,
      })
    )
    if (res.status === 201) {
      const newsCopy = JSON.parse(JSON.stringify(news))
      newsCopy.forEach((item: NewsType) => {
        if (item.postId === id) {
          item.isLiked = status === 'unlike' ? false : true
          item.countLikes =
            status === 'unlike'
              ? (item.countLikes || 0) - 1
              : (item.countLikes || 0) + 1
        }
      })
      setNews(newsCopy)
    }
  }

  return (
    <div className="w-full">
      <Tabs tab={tab} setTab={setTab} tabs={tabs} />
      {loading && (
        <div className="w-[48px] m-auto">
          <Loading />
        </div>
      )}
      <div className="grid grid-cols-4 gap-y-6">
        {!loading && news ? (
          (news || [])?.map((item: NewsType, index) => (
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
