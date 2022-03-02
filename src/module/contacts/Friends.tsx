import * as React from 'react'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import { FriendsType } from 'src/constants/types/contacts.types'
import { axios } from 'src/utils/axios'
import { FriendsCard } from './components/FriendsCard'
import { SkeletonContact } from './components/SkeletonContact'

export const Friends = () => {
  const [totalFriend, setTotalFriend] = useState<Number>(0)
  const [items, setItems] = useState<FriendsType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const getListContact = async () => {
    setIsLoading(true)
    const res = await axios.get(API_GET_LIST_CONTACT, {
      params: {
        limit: 20,
        startAfter: items.length,
        tab: 'FRIENDS',
      },
    })
    if (res.status === 200) {
      setIsLoading(false)
      setTotalFriend(res.data.count)
      const arr = items.concat(res.data.data)
      setItems(arr)
    }
  }

  const fetchMoreData = async () => {
    if (items.length >= totalFriend) {
      setHasMore(false)
      return
    }
    await getListContact()
  }

  useEffect(() => {
    getListContact()
  }, [])

  return (
    <div>
      <p className="text-18px font-bold">
        <span className="text-[#09E099]">{totalFriend} </span>
        {totalFriend === 1 ? 'Friend' : 'Friends'}
      </p>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={isLoading ? <SkeletonContact /> : <></>}
      >
        {(items || []).map((it: FriendsType, index: number) => (
          <FriendsCard key={index} user={it} />
        ))}
      </InfiniteScroll>
    </div>
  )
}
