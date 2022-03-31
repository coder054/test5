import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import type { FC } from 'react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Tip } from 'src/components/tip'
import { IUsersSearch } from 'src/constants/types/searchUsers.types'
import { SearchIcon } from 'src/icons/search'
import { XIcon } from 'src/icons/x'
import { axios } from 'src/utils/axios'
import { getStr, truncateStr } from 'src/utils/utils'
import { useDebounce } from 'use-debounce'
import { chain, isEmpty } from 'lodash'

interface ContentSearchProps {
  onClose?: () => void
  open?: boolean
}

// here aaa1 declare ModalAddFriends
export const ModalAddFriends: FC<ContentSearchProps> = (props) => {
  const searchInputRef = useRef(null)
  const { onClose, open, ...other } = props
  const [value, setValue] = useState<string>('')
  const [valueDebounce] = useDebounce(value, 300)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [users, setUsers] = useState<IUsersSearch[]>(null)
  const [items, setItems] = useState(Array.from({ length: 10 }))
  const [listChecked, setListChecked] = useState([])

  const limit = 30

  useEffect(() => {
    console.log('aaa items: ', items)
  }, [items])

  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault()
    setShowResults(false)
    setIsLoading(true)
    // Do search here

    const getMembersWithKeyword = async (
      keyword: string,
      startAfter
    ): Promise<{
      error: boolean
      data: IUsersSearch[]
    }> => {
      try {
        const params = {
          limit: 15,
          startAfter,
          sorted: 'asc',
          name: keyword,
        }
        const { data } = await axios.get(
          // /friends/search-not-friend?limit=10&sorted=asc&startAfter=0&search=bat
          `/friends/search-not-friend?${queryString.stringify(params)}`
        )
        return {
          error: false,
          data,
        }
      } catch (error) {
        console.log('aaa getMembersWithKeyword error', error)
        return {
          error: true,
          data: null,
        }
      }
    }
    const { data, error } = await getMembersWithKeyword(value, 0)
    if (error) {
      alert('Error searching users')
      setIsLoading(false)
      return
    }
    console.log('aaa data', data)
    //@ts-ignore: Unreachable code error
    setUsers(data.data)
    setIsLoading(false)
    setShowResults(true)
  }

  useEffect(() => {
    setItems([])
    fetchMoreData([], valueDebounce)
  }, [valueDebounce])

  useEffect(() => {
    if (open === true) {
      setTimeout(() => {
        const el = document.getElementById('searchInputRef')
        if (el) {
          el.focus()
        }
      }, 300)
    }
  }, [open])

  useEffect(() => {
    console.log('aaa listChecked: ', listChecked)
  }, [listChecked])

  const fetchMoreData = async (items, search) => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs

    console.log('aaa search', search)
    try {
      const params: any = {
        limit: 10,
        startAfter: items.length,
        sorted: 'asc',
        // search: keyword,
      }

      if (!!search) {
        params.search = search
      }
      const { data } = await axios.get(
        // /friends/search-not-friend?limit=10&sorted=asc&startAfter=0&search=bat
        `/friends/search-not-friend?${queryString.stringify(params)}`
      )

      setItems([...items, ...data.data])
    } catch (error) {}
  }

  const usersSafe = useMemo(() => {
    console.log('aaa users', users)
    return users || []
  }, [users])

  useEffect(() => {
    console.log('aaa items: ', items)
  }, [items])

  const aa = useMemo(() => {
    if (isEmpty(items)) {
      return []
    }

    //@ts-ignore: Unreachable code error
    const arr = items.map((o) => getStr(o, 'userId'))
    return chain(arr).compact().uniq().value()
  }, [items])

  useEffect(() => {
    console.log('aaa aa: ', aa)
  }, [aa])

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open} {...other}>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Add Friends</Typography>
        <pre className=" ">
          {JSON.stringify(listChecked.map((o) => o.userId))}
        </pre>

        <IconButton color="inherit" onClick={onClose}>
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {/* <Tip message="Search by entering a keyword and pressing Enter" /> */}
          <TextField
            id="searchInputRef"
            ref={searchInputRef}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            label="Search"
            onChange={(event): void => setValue(event.target.value)}
            placeholder="Search..."
            sx={{ mt: 3 }}
            value={value}
          />
        </form>
        {/*  */}

        <div className="h-[16px] "></div>

        <div id="scrollableDiv" style={{ height: 300, overflow: 'auto' }}>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData.bind(null, items, value)}
            hasMore={items.length < 67}
            scrollableTarget="scrollableDiv"
            loader={<h4>Loading...</h4>}
          >
            {items.map((user, index) => (
              <ItemUser
                key={getStr(user, 'userId')}
                user={user}
                listChecked={listChecked}
                setListChecked={setListChecked}
              ></ItemUser>
            ))}
          </InfiniteScroll>
        </div>

        {/*  */}
      </DialogContent>
    </Dialog>
  )
}

const ItemUser = ({ user, listChecked, setListChecked }) => {
  return (
    <Fragment key={user.username}>
      <div className="flex w-full items-center ">
        <img
          src={user.faceImage}
          className="w-[65px] h-[65px] object-cover rounded-[8px] mr-3"
          alt=""
        />
        <div className=" w-[200px] ">
          <div className="text-white font-semibold ">
            {user.firstName} {user.lastName} {user.userId}
          </div>
          <div className="flex justify-between ">
            <span className="text-Grey ">#{user.username}</span>
            <span className="text-Grey ">
              {getStr(user, 'favoriteRoles[0]')}
            </span>
          </div>

          <div className="flex justify-between ">
            <span className="text-white ">
              {truncateStr(user.city || '', 11)}
            </span>
            <span className="text-white ">{getStr(user, 'clubName')} </span>
          </div>
        </div>
        <div className="grow "></div>
        <div className="border">
          {listChecked
            .map((o) => getStr(o, 'userId'))
            .includes(getStr(user, 'userId')) ? (
            <svg
              onClick={() => {
                let findIndex = listChecked.findIndex((o) => {
                  return (o.userId = user.userId)
                })

                if (findIndex !== -1) {
                  const listCheckedClone = [...listChecked]
                  listCheckedClone.splice(findIndex, 1)
                  setListChecked(listCheckedClone)
                }
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-Green cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <div
              onClick={() => {
                setListChecked([...listChecked, user])
              }}
              className="w-6 h-6 border-2 border-Grey rounded-full cursor-pointer "
            ></div>
          )}
        </div>
        <div className="w-[8px] "></div>
      </div>
      <div className="h-[16px] "></div>
    </Fragment>
  )
}

ModalAddFriends.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
