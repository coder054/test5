import { CardNews } from 'src/components/card-news'
import { Loading } from 'src/components/loading/loading'
import { Tab, Tabs } from '@mui/material'

import {
  API_GET_LIST_NEWS_POST,
  API_LIKE_POST,
} from 'src/constants/api.constants'
import { NewsType } from 'src/constants/types'
import { useEffect, useState } from 'react'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { get } from 'lodash'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'News', value: 'news' },
  { label: 'Friends', value: 'friends' },
  { label: 'Teammates', value: 'teammates' },
  { label: 'Yours', value: 'yours' },
  { label: 'Family', value: 'family' },
  { label: 'Saved', value: 'saved' },
]

const News = () => {
  const [currentTab, setCurrentTab] = useQueryParam(
    't',
    withDefault(StringParam, 'news')
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [news, setNews] = useState<NewsType[]>([])
  const params = {
    limit: 12,
    sorted: 'asc',
    startAfter: 1,
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
  }, [get(axios, 'defaults.headers.roleId')])

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

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <div className="w-full">
      <Tabs
        sx={{ mb: 3 }}
        value={currentTab}
        onChange={handleTabsChange}
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value}></Tab>
        ))}
      </Tabs>
      {loading && (
        <div className="w-[48px] m-auto">
          <Loading />
        </div>
      )}
      <div
        className="md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-y-6 md:gap-x-2 mobileM:gap-x-10 2xl:gap-x-2
        flex flex-col items-center"
      >
        {news &&
          (news || [])?.map((item: NewsType, index) => (
            <div key={index} className="mb-[24px] md:mb-[0px]">
              <CardNews card={item} handleFavorite={handleFavorite} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default News
