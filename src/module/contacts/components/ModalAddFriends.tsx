import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { chain, isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import type { FC } from 'react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { notiToast } from 'src/components/common/Toast'
import { Loading } from 'src/components/loading/loading'
import { IUsersSearch } from 'src/constants/types/searchUsers.types'
import { SearchIcon } from 'src/icons/search'
import { XIcon } from 'src/icons/x'
import { axios } from 'src/utils/axios'
import { getErrorMessage, getStr, truncateStr } from 'src/utils/utils'
import { useDebounce } from 'use-debounce'

interface ContentSearchProps {
  onClose?: () => void
  open?: boolean
  refreshListContact: any
}

export const ModalAddFriends: FC<ContentSearchProps> = (props) => {
  const searchInputRef = useRef(null)
  const { onClose, open, refreshListContact, ...other } = props
  const [value, setValue] = useState<string>('')
  const [valueDebounce] = useDebounce(value, 300)
  const [users, setUsers] = useState<IUsersSearch[]>(null)
  const [items, setItems] = useState(Array.from({ length: 10 }))
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [listChecked, setListChecked] = useState([])
  const [saving, setSaving] = useState(false)

  const limit = 30

  useEffect(() => {
    console.log('aaa items: ', items)
  }, [items])

  const resetModal = () => {
    setListChecked([])
    setCount(0)
    setLoading(true)
    setItems([])
    setValue('')
  }

  useEffect(() => {
    if (open) {
      setItems([])
      fetchMoreData([], valueDebounce)
    }
  }, [valueDebounce, open])

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
      setLoading(true)
      const params: any = {
        limit: 10000,
        startAfter: 1,
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
      setCount(data.count)
    } catch (error) {
    } finally {
      setLoading(false)
    }
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
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        resetModal()
        onClose()
      }}
      open={open}
      {...other}
    >
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

        <IconButton color="inherit" onClick={onClose}>
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent>
        <div className="flex gap-x-[20px]">
          {listChecked.map((member, index) => (
            <div
              key={index}
              onClick={() => {
                let findIndex = listChecked.findIndex((o) => {
                  return o.userId === member.userId
                })
                const listCheckedClone = [...listChecked]
                listCheckedClone.splice(findIndex, 1)
                setListChecked(listCheckedClone)
              }}
              className="w-[40px] h-[40px] relative cursor-pointer  "
            >
              <img
                src={member.faceImage}
                className="rounded-full w-[35px] h-[35px] "
                alt=""
              />

              <div className="absolute z-10 right-[-8px] top-[-8px] rounded-full w-[16px] h-[16px] bg-white text-black flex items-center justify-center select-none ">
                x
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
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

        <div className=" flex mb-4 ">
          <div className="w-[20px] ">
            {loading ? (
              <Loading size={10}></Loading>
            ) : (
              <span className="text-Green mr-[10px] ">{count}</span>
            )}
          </div>
          <span className="text-Grey ">members found</span>
        </div>
        <div id="scrollableDiv" style={{ height: 300, overflow: 'auto' }}>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData.bind(null, items, value)}
            hasMore={items.length < count}
            scrollableTarget="scrollableDiv"
            loader={<h4></h4>}
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
        <div className="flex mt-4 ">
          <Button
            onClick={() => {
              resetModal()
              onClose()
            }}
            fullWidth
            size="large"
            sx={{ mr: 2 }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            disabled={saving}
            onClick={async () => {
              if (isEmpty(listChecked)) {
                notiToast({
                  type: 'error',
                  message: 'Please select at least 1 user',
                })
                return
              }

              try {
                setSaving(true)
                await axios.post(`/friends/add-multi-friends`, {
                  userIds: listChecked.map((o) => o.userId),
                })

                notiToast({
                  type: 'success',
                  message: 'Friend requests sent successfully',
                })
                onClose()
                resetModal()
                refreshListContact()
              } catch (error) {
                notiToast({
                  message: getErrorMessage(error),
                  type: 'error',
                })
              } finally {
                setSaving(false)
              }
            }}
            fullWidth
            size="large"
            variant="contained"
          >
            Save
          </Button>
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
            {user.firstName} {user.lastName}
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
        <div className="">
          <Checkbox
            checked={listChecked.map((o) => o.userId).includes(user.userId)}
            onChange={(event) => {
              // if currently checked
              if (listChecked.map((o) => o.userId).includes(user.userId)) {
                let findIndex = listChecked.findIndex((o) => {
                  return o.userId === user.userId
                })
                const listCheckedClone = [...listChecked]
                listCheckedClone.splice(findIndex, 1)
                setListChecked(listCheckedClone)
              } else {
                // if currently unchecked
                setListChecked([...listChecked, user])
              }
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
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
