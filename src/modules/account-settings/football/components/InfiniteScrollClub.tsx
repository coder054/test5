import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { ClickAwayListener, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { ArrowBackIcon } from 'src/components/icons'
import { MiniLoading } from 'src/components/mini-loading'
import { MyInput } from 'src/components/MyInput'
import { optionAllClub } from 'src/constants/mocks/clubs.constans'
import { QUERIES_CLUBS } from 'src/constants/query-keys/query-keys.constants'
import { ClubType } from 'src/constants/types/settingsType.type'
import { fetchClubs } from 'src/service/users/settings.service'
import { safeHttpImage } from 'src/utils/utils'
import { NewClubModal } from './NewClubModal'

interface InfiniteScrollClubProps {
  label: string
  errorMessage?: string
  handleSetClub?: (value: ClubType) => void
  value?: ClubType
  isHideAddNewClub?: boolean
}

interface Queries {
  limit: number
  startAfter: number
  clubName: string
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
  value,
  errorMessage,
  label,
  isHideAddNewClub,
}: InfiniteScrollClubProps) => {
  const { ref, inView } = useInView()
  const [club, setClub] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false)

  const [queries, setQueries] = useState<Queries>({
    limit: 10,
    startAfter: 0,
    clubName: '',
  })

  const { data, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery(
      [QUERIES_CLUBS.CLUBS, queries],
      async ({ pageParam = 0 }) => {
        return fetchClubs({ ...queries, startAfter: pageParam })
      },
      {
        getNextPageParam: (lastPage, page) => {
          if (lastPage.data.length < queries.limit) {
            return undefined
          }
          return page.length * 10 + lastPage.data.length
        },
      }
    )

  const handleChangeClub = useCallback(
    (value: ClubType) => {
      setIsOpenOption(false)
      handleSetClub && handleSetClub(value)
      setClub(value.clubName)
    },
    [club]
  )

  const handleSearchClub = debounce((value: string) => {
    setQueries((prev) => ({ ...prev, clubName: value }))
  }, 500)

  useEffect(() => {
    value ? setClub(value.clubName) : setClub('')
  }, [JSON.stringify(value)])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <Fragment>
      <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <Box sx={style}>
          <div className="flex items-center pb-7">
            <button
              onClick={() => setIsOpenModal(false)}
              className="mr-16 scale-105 "
            >
              <ArrowBackIcon />
            </button>
            <span className="text-[24px] font-semibold text-center">
              Add new Club
            </span>
          </div>
          <NewClubModal handleClose={() => setIsOpenModal(false)} />
        </Box>
      </Modal>
      <ClickAwayListener onClickAway={() => setIsOpenOption(false)}>
        <div className="relative">
          <MyInput
            key={club}
            label={label}
            defaultValue={club}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleSearchClub(e.target.value)
            }
            errorMessage={errorMessage && errorMessage}
            onClick={() => setIsOpenOption(true)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isLoading ? (
                    <MiniLoading size={20} color="#ffffff" />
                  ) : (
                    <span className={clsx(isOpenOption && 'rotate-180')}>
                      <ArrowDropDownIcon />
                    </span>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <div
            className={clsx('absolute w-full z-50', !isOpenOption && 'hidden')}
          >
            {isHideAddNewClub ? null : (
              <div className="bg-[#111827] text-gray-400 py-1.5 px-3 ">
                No club found,{' '}
                <span
                  onClick={() => setIsOpenModal(true)}
                  className="underline cursor-pointer"
                >
                  add new club
                </span>
              </div>
            )}
            <div className="h-[260px] overflow-y-auto">
              <button
                className="bg-[#111827] w-full  text-gray-400 py-1.5 px-3 cursor-pointer hover:bg-gray-600 duration-150 flex items-center space-x-4"
                onClick={() => handleChangeClub(optionAllClub)}
              >
                <img
                  src={optionAllClub.logoUrl}
                  className="w-[30px] h-[30px] object-cover object-center rounded-full"
                />
                <p>{optionAllClub.clubName}</p>
              </button>
              {(data?.pages || []).map((page, index) => (
                <Fragment key={index}>
                  {(page.data || []).map((item: ClubType, index: number) => (
                    <button
                      className="bg-[#111827] w-full  text-gray-400 py-1.5 px-3 cursor-pointer hover:bg-gray-600 duration-150 flex items-center space-x-4"
                      onClick={() => handleChangeClub(item)}
                      key={index}
                    >
                      <img
                        src={safeHttpImage(item.logoUrl) ?? '/favicon.png'}
                        className="w-[30px] h-[30px] object-cover object-center rounded-full"
                      />
                      <p>{item.clubName}</p>
                    </button>
                  ))}
                </Fragment>
              ))}
              <p className="flex justify-center py-2 bg-[#111827]" ref={ref}>
                {isFetchingNextPage && (
                  <MiniLoading color="#09E099" size={18} />
                )}
              </p>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </Fragment>
  )
}
