import { CircularProgress, InputAdornment, TextField } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { notiToast } from 'src/components/common/Toast'
import { Loading } from 'src/components/loading/loading'
import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import { LIMIT } from 'src/constants/constants'
import {
  optionAllCountry,
  optionSweden,
} from 'src/constants/mocks/countries.constants'
import { FriendsType } from 'src/constants/types/contacts.types'
import { SearchIcon } from 'src/icons/search'
import { axios } from 'src/utils/axios'
import { getErrorMessage, getStr } from 'src/utils/utils'
import { useDebounce } from 'use-debounce'
import { FriendsCard } from './components/FriendsCard'
import { ModalAcceptFriends } from './components/ModalAcceptFriends'
import { ModalAddFriends } from './components/ModalAddFriends'
import { ModalFilterFriends } from './components/ModalFilterFriends'

export const Friends = () => {
  const [totalFriend, setTotalFriend] = useState<Number>(0)
  const [friendRequestCount, setFriendRequestCount] = useState(0)
  const [items, setItems] = useState<FriendsType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [keyword, setKeyword] = useState('')

  const [keywordDebounce] = useDebounce(keyword, 300)

  const [setOpenModalAddtFriend, setOpenModalAddFriend] =
    useState<boolean>(false)
  const [openModalAcceptFriend, setOpenModalAcceptFriend] =
    useState<boolean>(false)

  const [openModalFilter, setOpenModalFilter] = useState(false)
  const [country, setCountry] = useState(optionSweden)
  const countryRef = useRef(country)
  const [contractedClub, setContractedClub] = useState({
    arena: '',
    city: '',
    clubId: '',
    clubName: '',
    country: '',
    logoUrl: '',
    nickName: '',
    websiteUrl: null,
  })
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const [role, setRole] = useState<'All' | 'Player' | 'Coach'>('All')

  const hasMore = useMemo(() => {
    return items.length < totalFriend
  }, [items.length, totalFriend])

  const countryName = useMemo(() => {
    return getStr(countryRef.current, 'name')
  }, [countryRef.current])

  const countryNameDisplayed = useMemo(() => {
    return countryName === 'All' || countryName === ''
      ? 'the world'
      : countryName
  }, [countryName])

  const startAfter = useMemo(() => {
    const len = items.length

    return Math.floor(len / LIMIT) + 1
  }, [items.length])

  useEffect(() => {
    console.log('aaa countryName: ', countryName)
  }, [countryName])

  const clubId = useMemo(() => {
    return getStr(contractedClub, 'clubId')
  }, [contractedClub])

  const handleOpenModalAddFriend = (): void => {
    setOpenModalAddFriend(true)
  }

  const handleCloseModalAddFriend = (): void => {
    setOpenModalAddFriend(false)
  }

  const handleOpenModalAcceptFriend = (): void => {
    setOpenModalAcceptFriend(true)
  }

  const handleCloseModalAcceptFriend = (): void => {
    setOpenModalAcceptFriend(false)
  }

  const getListContact = async (
    initItems,
    search,
    clubId,
    sort,
    countryName,
    startAfter
  ) => {
    try {
      setIsLoading(true)
      const body: any = {
        limit: LIMIT,
        startAfter,
        tab: 'FRIENDS',
        sorted: sort,
      }

      if (countryName !== optionAllCountry.name && countryName !== '') {
        body.country = countryName
      }

      if (!!clubId) {
        body.clubId = clubId
      }

      if (!!search) {
        body.search = search
      }
      const res = await axios.get(API_GET_LIST_CONTACT, {
        params: body,
      })
      if (res.status === 200) {
        setFriendRequestCount(res.data.countFriendRequests)
        setTotalFriend(res.data.count)
        const arr = initItems.concat(res.data.data)
        setItems(arr)
      }
    } catch (error) {
      notiToast({
        message: getErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMoreData = async () => {
    await getListContact(
      items,
      keywordDebounce,
      clubId,
      sort,
      countryName,
      startAfter
    )
  }

  useEffect(() => {
    setItems([])
    getListContact([], keywordDebounce, clubId, sort, countryName, 1)
  }, [keywordDebounce])

  useEffect(() => {
    setItems([])
    getListContact([], keywordDebounce, clubId, sort, countryName, 1)
  }, [sort])

  const refreshListContact = () => {
    getListContact([], keywordDebounce, clubId, sort, countryName, 1)
  }

  return (
    <div>
      {/* // here aaa1 render ModalFilterFriends */}
      <ModalFilterFriends
        open={openModalFilter}
        onClose={() => {
          setOpenModalFilter(false)
        }}
        country={country}
        setCountry={setCountry}
        contractedClub={contractedClub}
        setContractedClub={setContractedClub}
        role={role}
        setRole={setRole}
        getListContact={getListContact.bind(
          null,
          [],
          keywordDebounce,
          clubId,
          sort
        )}
        countryRef={countryRef}
      ></ModalFilterFriends>

      <ModalAddFriends
        onClose={handleCloseModalAddFriend}
        open={setOpenModalAddtFriend}
        refreshListContact={refreshListContact}
      />
      <ModalAcceptFriends
        onClose={handleCloseModalAcceptFriend}
        open={openModalAcceptFriend}
        refreshListContact={refreshListContact}
      />

      <div className="md:flex items-center  ">
        <div
          onClick={() => {
            if (friendRequestCount === 0) {
              setOpenModalAddFriend(true)
            } else {
              setOpenModalAcceptFriend(true)
            }
          }}
          className=" mb-[16px] md:mb-[0px] flex items-center gap-x-[8px] cursor-pointer "
        >
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

          {friendRequestCount === 0 ? (
            <>
              <div className="text-Grey font-medium text-[16px] leading-[175%] ">
                Add more friends
              </div>
            </>
          ) : (
            <div className="text-Grey font-medium text-[16px] leading-[175%] ">
              You’ve got
              <span className="text-Green ">{` ${friendRequestCount} `}</span>
              friend requests
            </div>
          )}

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
      <div className="flex ">
        <p className="text-18px font-bold">
          {isLoading ? (
            <div className="pr-3 inline-block ">
              <Loading size={10}></Loading>
            </div>
          ) : (
            <span className="text-[#09E099] inline-block ">{totalFriend} </span>
          )}
          {` ${
            totalFriend === 1 ? 'Friend' : 'Friends'
          } in ${countryNameDisplayed}`}
        </p>

        <div className="grow min-w-[50px] "></div>
        <div className="flex gap-x-[24px] items-center ">
          {sort === 'asc' ? (
            <svg
              onClick={() => {
                setSort('desc')
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-[24px] w-[24px] cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
            </svg>
          ) : (
            <svg
              onClick={() => {
                setSort('asc')
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-[24px] w-[24px] cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
            </svg>
          )}

          {/* // here aaa1 svg filter */}
          <svg
            onClick={() => {
              setOpenModalFilter(true)
            }}
            className="cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 11H16V13H4V11ZM4 6H20V8H4V6ZM4 18H11H11.235V16H11H4V18Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          isLoading ? (
            <div className="p-4 flex items-center justify-center ">
              <CircularProgress />
            </div>
          ) : (
            <></>
          )
        }
        endMessage={
          isLoading ? null : (
            <p style={{ textAlign: 'center', opacity: '0' }}>
              <b>Yay! You have seen it all</b>
            </p>
          )
        }
      >
        {(items || []).map((it: FriendsType, index: number) => (
          <FriendsCard key={index} user={it} />
        ))}
      </InfiniteScroll>
    </div>
  )
}
