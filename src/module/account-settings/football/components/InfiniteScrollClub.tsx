import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {
  CircularProgress,
  ClickAwayListener,
  InputAdornment,
} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ArrowBackIcon } from 'src/components/icons'
import { MyInput } from 'src/components/MyInput'
import { API_GET_LIST_CLUB } from 'src/constants/api.constants'
import {
  ClubType,
  ContractedClubType,
} from 'src/constants/types/settingsType.type'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { NewClubModal } from './NewClubModal'

type InfiniteScrollClubProps = {
  errorMessage?: string
  handleSetClub: (value: ClubType) => void
  initialValue: ContractedClubType
}

const style = {
  borderRadius: 1,
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#1E1F24',
  p: 4,
}

export const InfiniteScrollClub = ({
  handleSetClub,
  initialValue,
  errorMessage,
}: InfiniteScrollClubProps) => {
  const { currentRoleId } = useAuth()
  const [items, setItems] = useState<any>([])
  const [club, setClub] = useState<string>('')

  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    initialValue && setClub(initialValue.clubName)
  }, [initialValue])

  const handleChangeClub = useCallback(
    (value: ClubType) => {
      setIsOpenOption(false)
      handleSetClub && handleSetClub(value)
      setClub(value.clubName)
    },
    [club]
  )

  const handleSearchClub = useCallback(
    (value: string) => {
      setClub(value)
      setTimeout(async () => {
        const res = await axios.get(API_GET_LIST_CLUB, {
          headers: {
            roleId: currentRoleId,
          },
          params: {
            limit: 10,
            startAfter: 0,
            clubName: value,
          },
        })
        if (res.status === 200) {
          setItems(res.data)
        }
      }, 500)
    },
    [club]
  )

  const getListClub = async () => {
    const res = await axios.get(API_GET_LIST_CLUB, {
      headers: {
        roleId: currentRoleId,
      },
      params: {
        limit: 10,
        startAfter: items.length,
        clubName: ' ',
      },
    })
    if (res.status === 200) {
      const arr = items.concat(res.data)
      setItems(arr)
    }
  }

  const fetchMoreData = async () => {
    if (items.length >= 500) {
      setHasMore(false)
      return
    }
    await getListClub()
  }

  useEffect(() => {
    getListClub()
  }, [])

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center pb-7">
            <button onClick={handleClose} className="mr-16 scale-105 ">
              <ArrowBackIcon />
            </button>
            <span className="text-[24px] font-semibold text-center">
              Add new Club
            </span>
          </div>
          <NewClubModal handleClose={handleClose} />
        </Box>
      </Modal>
      <ClickAwayListener onClickAway={() => setIsOpenOption(false)}>
        <div className="relative">
          <MyInput
            label="Your Club"
            onChange={(e) => handleSearchClub(e.target.value)}
            onClick={() => setIsOpenOption(true)}
            value={club}
            name="password"
            autoComplete="off"
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span
                    className={clsx(
                      isOpenOption && 'rotate-180',
                      'duration-100'
                    )}
                  >
                    <ArrowDropUpIcon />
                  </span>
                </InputAdornment>
              ),
            }}
            errorMessage={errorMessage && errorMessage}
          />
          <div
            className={clsx('absolute w-full z-50', !isOpenOption && 'hidden')}
          >
            <div className="bg-[#111827] text-gray-400 py-1.5 px-3 ">
              No club found,{' '}
              <span onClick={handleOpen} className="underline cursor-pointer">
                add new club
              </span>
            </div>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <span className="flex justify-center bg-[#111827] py-2 text-gray-400">
                  <CircularProgress size={20} />
                </span>
              }
              height={300}
            >
              {(items || []).map((it: ClubType, index: number) => (
                <div
                  className="bg-[#111827] text-gray-400 py-1.5 px-3 cursor-pointer hover:bg-gray-600 duration-150"
                  onClick={() => handleChangeClub(it)}
                  key={index}
                >
                  {it.clubName}
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </ClickAwayListener>
    </>
  )
}
