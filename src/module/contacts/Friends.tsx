import { InputAdornment, TextField } from '@mui/material'
import { Loading } from 'src/components/loading/loading'
import { useEffect, useState, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { notiToast } from 'src/components/common/Toast'
import { ContentSearchDialog } from 'src/components/dashboard/content-search-dialog'
import { MyModal } from 'src/components/Modal'
import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import { optionAllCountry } from 'src/constants/mocks/countries.constants'
import { FriendsType } from 'src/constants/types/contacts.types'
import { SearchIcon } from 'src/icons/search'
import { SvgXIcon } from 'src/imports/svgs'
import { axios } from 'src/utils/axios'
import { getErrorMessage, getStr } from 'src/utils/utils'
import { useDebounce } from 'use-debounce'
import { FriendsCard } from './components/FriendsCard'
import { ModalAcceptFriends } from './components/ModalAcceptFriends'
import { ModalAddFriends } from './components/ModalAddFriends'
import { ModalFilterFriends } from './components/ModalFilterFriends'
import { SkeletonContact } from './components/SkeletonContact'

export const Friends = () => {
  const [totalFriend, setTotalFriend] = useState<Number>(0)
  const [friendRequestCount, setFriendRequestCount] = useState(0)
  const [items, setItems] = useState<FriendsType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [keyword, setKeyword] = useState('')

  const [keywordDebounce] = useDebounce(keyword, 300)

  const [setOpenModalAddtFriend, setOpenModalAddFriend] =
    useState<boolean>(false)
  const [openModalAcceptFriend, setOpenModalAcceptFriend] =
    useState<boolean>(false)

  const [openModalFilter, setOpenModalFilter] = useState(false)
  const [country, setCountry] = useState(optionAllCountry)
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

  const countryName = useMemo(() => {
    return getStr(country, 'name')
  }, [country])

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

  const getListContact = async (initItems, search, countryName, clubId) => {
    try {
      setIsLoading(true)
      const body: any = {
        limit: 1000,
        startAfter: 0,
        tab: 'FRIENDS',
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
    if (items.length >= totalFriend) {
      setHasMore(false)
      return
    }
    console.log('aaa getListContact1')
    await getListContact(items, keywordDebounce, countryName, clubId)
  }

  useEffect(() => {
    setItems([])
    console.log('aaa getListContact2')
    getListContact([], keywordDebounce, countryName, clubId)
  }, [keywordDebounce])

  const refreshListContact = () => {
    getListContact([], keywordDebounce, countryName, clubId)
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
        sort={sort}
        setSort={setSort}
        getListContact={getListContact.bind(
          null,
          [],
          keywordDebounce,
          countryName,
          clubId
        )}
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
            <Loading size={10}></Loading>
          ) : (
            <span className="text-[#09E099] ml-[50px] inline-block ">{totalFriend} </span>
          )}
          {totalFriend === 1 ? 'Friend' : 'Friends'}
        </p>

        <div className="grow min-w-[50px] "></div>
        <div className="flex gap-x-[24px] ">
          <svg
            className="cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.22701 11.0001H17.774C18.636 11.0001 19.094 9.98009 18.521 9.33509L12.748 2.84009C12.6544 2.7344 12.5394 2.64978 12.4106 2.59183C12.2818 2.53387 12.1422 2.50391 12.001 2.50391C11.8598 2.50391 11.7202 2.53387 11.5914 2.59183C11.4627 2.64978 11.3476 2.7344 11.254 2.84009L5.47901 9.33509C4.90601 9.98009 5.36401 11.0001 6.22701 11.0001ZM11.253 21.1591C11.3466 21.2648 11.4617 21.3494 11.5904 21.4074C11.7192 21.4653 11.8588 21.4953 12 21.4953C12.1412 21.4953 12.2808 21.4653 12.4096 21.4074C12.5384 21.3494 12.6534 21.2648 12.747 21.1591L18.52 14.6641C19.094 14.0201 18.636 13.0001 17.773 13.0001H6.22701C5.36501 13.0001 4.90701 14.0201 5.48001 14.6651L11.253 21.1591Z"
              fill="white"
            />
          </svg>

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
