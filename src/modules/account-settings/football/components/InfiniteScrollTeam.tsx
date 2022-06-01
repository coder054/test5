import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {
  CircularProgress,
  ClickAwayListener,
  InputAdornment,
} from '@mui/material'
import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MyInput } from 'src/components/MyInput'
import { API_GET_LIST_TEAM, API_GET_MY_TEAM } from 'src/constants/api.constants'
import {
  CurrentTeamType,
  TeamType,
} from 'src/constants/types/settingsType.type'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { axios } from 'src/utils/axios'

type InfiniteScrollTeamProps = {
  handleSetTeam?: (value: CurrentTeamType) => void
  setTeamId?: (teamId: string) => void
  label: string
  placeholder?: string
  idClub?: string
  teamName?: string
  item?: TeamType
  errorMessage?: string
  yourTeam?: boolean
}

export const InfiniteScrollTeam = ({
  handleSetTeam,
  idClub,
  label,
  item,
  teamName,
  errorMessage,
  placeholder,
  setTeamId,
  yourTeam,
}: InfiniteScrollTeamProps) => {
  const [items, setItems] = useState<any>([])
  const [team, setTeam] = useState<string>('')

  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false)
  const { currentRoleId } = useAuth()

  const param = useMemo(() => {
    return {
      limit: 10,
      sorted: 'asc',
      clubId: idClub,
      gender: 'MALE',
      userType: 'PLAYER',
    }
  }, [idClub])

  useEffect(() => {
    item && setTeam(item.teamName)
    teamName && setTeam(teamName)
  }, [item, teamName])

  const handleChangeTeam = useCallback(
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
      setTeamId && setTeamId(value.teamId)
    },
    [team]
  )

  const handleSearch = useCallback(
    (value: string) => {
      setTeam(value)
      idClub &&
        setTimeout(async () => {
          await axios
            .get(API_GET_LIST_TEAM, {
              params: {
                ...param,
                startAfter: 0,
                searchQuery: value,
              },
            })
            .then((res) => {
              setItems(res.data)
            })
            .catch(() => {
              toast.error('Something went wrong')
            })
        }, 500)
    },
    [team]
  )

  const getListTeam = async () => {
    await axios
      .get(API_GET_LIST_TEAM, {
        params: {
          ...param,
          startAfter: items.length,
        },
      })
      .then((res) => {
        if (res.data.length <= 10) {
          setItems(res.data)
          setHasMore(false)
        } else {
          let arr = items.concat(res.data)
          setItems(arr)
        }
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }

  const fetchMoreData = async () => {
    if (items.length >= 500) {
      setHasMore(false)
      return
    }
    if (yourTeam) {
      await getYourTeam()
    } else {
      await getListTeam()
    }
  }

  useEffect(() => {
    idClub && isOpenOption && getListTeam()
  }, [idClub])

  //GET YOUR TEAM development
  const getYourTeam = async () => {
    await axios
      .get(`${API_GET_MY_TEAM}/${currentRoleId}`)
      .then((res) => {
        if (res.data.length <= 10) {
          setItems(res.data)
          setHasMore(false)
        } else {
          let arr = items.concat(res.data)
          setItems(arr)
        }
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }

  useEffect(() => {
    yourTeam && getYourTeam()
  }, [yourTeam])

  return (
    <ClickAwayListener onClickAway={() => setIsOpenOption(false)}>
      <div className="relative w-full">
        <MyInput
          label={label}
          onChange={(e) => handleSearch(e.target.value)}
          onClick={() => setIsOpenOption(true)}
          value={team}
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
          placeholder={placeholder}
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
                onClick={() => handleChangeTeam(it)}
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
