import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import { TeamsType } from 'src/constants/types/contacts.types'
import { axios } from 'src/utils/axios'
import { SkeletonContact } from './components/SkeletonContact'

export const Groups = () => {
  const [count, setCount] = useState<Number>(0)
  const [items, setItems] = useState<TeamsType[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)

  const getListContact = async () => {
    const res = await axios.get(API_GET_LIST_CONTACT, {
      params: {
        limit: 10,
        startAfter: items.length,
        tab: 'GROUPS',
      },
    })
    if (res.status === 200) {
      setCount(res.data.count)
      const arr = items.concat(res.data.data)
      setItems(arr)
    }
  }

  const fetchMoreData = async () => {
    console.log(items.length, count)

    if (items.length >= count) {
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
        <span className="text-[#09E099]">{count}</span>{' '}
        {count === 1 ? 'Team' : 'Teams'}
      </p>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<SkeletonContact />}
      >
        {(items || []).map((it: any, index: number) => (
          // <TeamsCard team={it} key={index} />
          <div>ABC</div>
        ))}
      </InfiniteScroll>
    </div>
  )
}
