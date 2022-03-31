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
  refreshListContact
}

export const ModalAcceptFriends: FC<ContentSearchProps> = (props) => {
  const searchInputRef = useRef(null)
  const [saving, setSaving] = useState(false)
  const { onClose, open, refreshListContact, ...other } = props
  const [items, setItems] = useState(Array.from({ length: 10 }))
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [listChecked, setListChecked] = useState([])

  const resetModal = () => {
    setListChecked([])
    setCount(0)
    setLoading(true)
    setItems([])
  }

  useEffect(() => {
    if (open) {
      setItems([])
      fetchMoreData()
    }
  }, [open])

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

  const fetchMoreData = async () => {
    try {
      setLoading(true)
      const params: any = {
        limit: 1000,
        sorted: 'asc',
        status: 'requested',
        type: 'friends',
      }

      const { data } = await axios.get(
        `/friends/get-list-relationships?${queryString.stringify(params)}`
      )

      setItems(data.data)
      setCount(data.count)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

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
        <Typography variant="h6">Friend requests</Typography>

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
          <span className="text-Grey ">Friend requests</span>
        </div>
        <div id="scrollableDiv" style={{ height: 300, overflow: 'auto' }}>
          {items.map((user, index) => (
            <ItemUser
              key={getStr(user, 'userId')}
              user={user}
              listChecked={listChecked}
              setListChecked={setListChecked}
            ></ItemUser>
          ))}
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
                const params = {
                  status: 'accepted',
                  type: 'friends',
                  userIds: listChecked.map((o) => o.userId),
                }

                await axios.patch(
                  `/friends/response-relationship?${queryString.stringify(
                    params
                  )}`
                )
                refreshListContact()
                notiToast({
                  type: 'success',
                  message: 'Friend requests accepted successfully',
                })
                onClose()
                resetModal()
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
