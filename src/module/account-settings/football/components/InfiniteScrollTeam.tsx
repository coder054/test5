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
import {
  API_GET_LIST_CLUB,
  API_GET_LIST_TEAM,
} from 'src/constants/api.constants'
import {
  ClubType,
  CurrentTeamType,
  TeamType,
} from 'src/constants/types/settingsType.type'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { NewClubModal } from './NewClubModal'

type InfiniteScrollTeamProps = {
  handleSetTeam?: (value: CurrentTeamType) => void
  idClub: string
  item: CurrentTeamType
  errorMessage?: string
}

export const InfiniteScrollTeam = ({
  handleSetTeam,
  idClub,
  item,
  errorMessage,
}: InfiniteScrollTeamProps) => {
  const { currentRoleId } = useAuth()
  const [items, setItems] = useState<any>([])
  const [team, setTeam] = useState<string>('')

  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false)

  const param = {
    limit: 10,
    sorted: 'asc',
    clubId: idClub,
    gender: 'MALE',
    userType: 'PLAYER',
  }

  useEffect(() => {
    setTeam(item.teamName)
  }, [item])

  const handleChangeClub = useCallback(
    (value: TeamType) => {
      setIsOpenOption(false)
      handleSetTeam &&
        handleSetTeam({
          teamId: value.teamId,
          clubId: value.clubId,
          teamImage: value.teamImage,
          teamName: value.teamName,
        })
      setTeam(value.teamName)
    },
    [team]
  )

  const handleSearch = useCallback(
    (value: string) => {
      setTeam(value)
      setTimeout(async () => {
        const res = await axios.get(API_GET_LIST_TEAM, {
          headers: {
            roleId: currentRoleId,
          },
          params: {
            ...param,
            startAfter: 0,
            searchQuery: value,
          },
        })
        if (res.status === 200) {
          setItems(res.data)
        }
      }, 500)
    },
    [team]
  )

  const getListTeam = async () => {
    const res = await axios.get(API_GET_LIST_TEAM, {
      params: {
        ...param,
        startAfter: items.length,
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
    await getListTeam()
  }

  useEffect(() => {
    getListTeam()
  }, [])

  return (
    <ClickAwayListener onClickAway={() => setIsOpenOption(false)}>
      <div className="relative w-full">
        <MyInput
          label="Your Teams(s)"
          onChange={(e) => handleSearch(e.target.value)}
          onClick={() => setIsOpenOption(true)}
          value={team}
          name="password"
          autoComplete="off"
          type="text"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span
                  className={clsx(isOpenOption && 'rotate-180', 'duration-100')}
                >
                  <ArrowDropUpIcon />
                </span>
              </InputAdornment>
            ),
          }}
          errorMessage={errorMessage}
        />
        <div
          className={clsx('absolute w-full z-50', !isOpenOption && 'hidden')}
        >
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
            {(items || []).map((it: TeamType, index: number) => (
              <div
                className="bg-[#111827] text-gray-400 py-1.5 px-3 cursor-pointer hover:bg-gray-600 duration-150"
                onClick={() => handleChangeClub(it)}
                key={index}
              >
                {it.teamName}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </ClickAwayListener>
  )
}
