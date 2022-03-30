import { InputAdornment, TextField } from '@mui/material'
import * as React from 'react'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import { FriendsType } from 'src/constants/types/contacts.types'
import { SearchIcon } from 'src/icons/search'
import { axios } from 'src/utils/axios'
import { useDebounce } from 'use-debounce'
import { FriendsCard } from './components/FriendsCard'
import { SkeletonContact } from './components/SkeletonContact'

export const Friends = () => {
  const [totalFriend, setTotalFriend] = useState<Number>(0)
  const [friendRequestCount, setFriendRequestCount] = useState(0)
  const [items, setItems] = useState<FriendsType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [keyword, setKeyword] = useState('')
  const [keywordDebounce] = useDebounce(keyword, 300)

  const getListContact = async (initItems, search) => {
    setIsLoading(true)
    const body: any = {
      limit: 20,
      startAfter: initItems.length,
      tab: 'FRIENDS',
    }

    if (!!search) {
      body.search = search
    }
    const res = await axios.get(API_GET_LIST_CONTACT, {
      params: body,
    })
    if (res.status === 200) {
      setFriendRequestCount(res.data.countFriendRequests)
      setIsLoading(false)
      setTotalFriend(res.data.count)
      const arr = initItems.concat(res.data.data)
      setItems(arr)
    }
  }

  const fetchMoreData = async () => {
    if (items.length >= totalFriend) {
      setHasMore(false)
      return
    }
    await getListContact(items, '')
  }

  useEffect(() => {
    getListContact(items, '')
  }, [])

  useEffect(() => {
    setItems([])
    getListContact([], keywordDebounce)
  }, [keywordDebounce])

  return (
    <div>
      <div className="md:flex items-center  ">
        <div className="mb-[16px] md:mb-[0px] flex items-center gap-x-[8px] cursor-pointer ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.67 13.1299C18.04 14.0599 19 15.3199 19 16.9999V19.9999H23V16.9999C23 14.8199 19.43 13.5299 16.67 13.1299Z"
              fill="#09E099"
            />
            <path
              d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
              fill="#09E099"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C14.53 4 14.09 4.1 13.67 4.24C14.5 5.27 15 6.58 15 8C15 9.42 14.5 10.73 13.67 11.76C14.09 11.9 14.53 12 15 12Z"
              fill="#09E099"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 13C6.33 13 1 14.34 1 17V20H17V17C17 14.34 11.67 13 9 13Z"
              fill="#09E099"
            />
          </svg>

          <div className="text-Grey font-medium text-[16px] leading-[175%] ">
            You’ve got
            <span className="text-Green ">{` ${friendRequestCount} `}</span>
            friend request
          </div>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.92004 2.74634L9.17338 7.99967L3.92004 13.253L5.33338 14.6663L12 7.99967L5.33338 1.33301L3.92004 2.74634Z"
              fill="#6B7280"
            />
          </svg>
        </div>
        <div className="hidden md:block min-w-[50px] grow "></div>

        <div className="mb-[16px] ">
          <TextField
            size="small"
            fullWidth
            placeholder="Search"
            name="searchfriends"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            value={keyword}
            onChange={(e) => {
              //@ts-ignore: Unreachable code error
              setKeyword(e.target.value)
            }}
          />
        </div>
      </div>
      <p className="text-18px font-bold">
        <span className="text-[#09E099]">{totalFriend} </span>
        {totalFriend === 1 ? 'Friend' : 'Friends'}
      </p>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={isLoading ? <SkeletonContact /> : <></>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {(items || []).map((it: FriendsType, index: number) => (
          <FriendsCard key={index} user={it} />
        ))}
      </InfiniteScroll>
    </div>
  )
}
