import clsx from 'clsx'
import { debounce } from 'lodash'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { ChervonRightIcon, XIcon } from 'src/components/icons'
import { ArrowDownIcon } from 'src/components/icons/ArrowDownIcon'
import { MiniLoading } from 'src/components/mini-loading'
import { ModalMui } from 'src/components/ModalMui'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import {
  DashboardTabType,
  LastRangeDateType,
} from 'src/constants/types/dashboard/training.types'
import { flexingFormatDate } from 'src/hooks/functionCommon'
import DiaryUpdate from 'src/modules/update-diary'
import { fetchUpdates } from 'src/service/dashboard/training.service'
import { safeHttpImage } from 'src/utils/utils'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'

interface MatchUpdatesProps {
  range: string
}

type QueryType = {
  range: LastRangeDateType
  tab: DashboardTabType
  limit: number
  sorted: 'asc' | 'desc'
  startAfter: number
}

const MatchUpdates = ({ range }: MatchUpdatesProps) => {
  const { ref, inView } = useInView()
  const { currentRoleName } = useAuth()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedUpdates, setSelectedUpdates] = useState(undefined)

  const [queries, setQueries] = useState<QueryType>({
    range,
    tab: 'MATCH',
    limit: 10,
    sorted: 'asc',
    startAfter: null,
  })

  const { data, isSuccess, isFetching, isError, fetchNextPage } =
    useInfiniteQuery(
      [QUERIES_DASHBOARD.MATCH_UPDATE, queries],
      async ({ pageParam = null }) =>
        fetchUpdates({
          ...queries,
          startAfter: pageParam,
        }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.data.length < queries.limit) {
            return undefined
          }
          return lastPage.data[lastPage.data.length - 1].createdAt
        },
      }
    )

  const handleChooseUpdates = (value: any) => {
    setSelectedUpdates(value)
    setIsOpenModal(true)
  }

  const handleSort = debounce(() => {
    setQueries((prev) => ({
      ...prev,
      sorted: prev.sorted === 'asc' ? 'desc' : 'asc',
    }))
  }, 500)

  const countGoal = useCallback(
    (value: { event: string; minutes: number }[]) => {
      let goals = 0
      let assists = 0
      if (value)
        for (let i = 0; i <= value.length; i++) {
          if (value[i]?.event === 'GOAL') {
            goals++
          } else if (value[i]?.event === 'ASSIST') {
            assists++
          }
        }
      return `${goals}/${assists}`
    },
    [JSON.stringify(data)]
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    !isOpenModal && setSelectedUpdates(undefined)
  }, [isOpenModal])

  return (
    <div className="laptopM:p-8 mobileM:p-2 bg-defaultBackGround rounded-lg">
      <div className="space-y-6">
        <p className="text-[18px] font-bold mobileM:text-center laptopM:text-left">
          Match Updates
        </p>
        <div>
          <ModalMui
            sx={{
              padding: 0,
              top: '50%',
              width: isMobile ? '100%' : 800,
              overflow: 'auto',
            }}
            isOpen={isOpenModal}
            onClose={setIsOpenModal}
          >
            <div className="relative h-[850px] overflow-y-auto">
              <button
                type="button"
                onClick={() => setIsOpenModal(false)}
                className="absolute z-50 right-6 top-5"
              >
                <XIcon />
              </button>
              <DiaryUpdate
                selected={selectedUpdates}
                onClose={setIsOpenModal}
              />
            </div>
          </ModalMui>
          <div className="bg-[#13161A] text-[#A2A5AD] laptopM:text-[16px] mobileM:text-[13px] font-medium grid grid-cols-12 px-4 py-2 mobileM:pl-2">
            <p className="col-span-2">
              <button
                onClick={handleSort}
                className="flex items-center laptopM:space-x-4"
              >
                <p>Date</p>
                <span
                  className={clsx(
                    'scale-150 duration-150',
                    queries.sorted === 'desc' && 'rotate-180'
                  )}
                >
                  <ArrowDownIcon />
                </span>
              </button>
            </p>
            <p className="col-span-3">Opponent</p>
            <p className="col-span-2">Score</p>
            <p className="col-span-2">Goal/Ass</p>
            <p className="col-span-2">Min.</p>
            <p className="col-span-1 invisible">Action</p>
          </div>
          {isSuccess && (
            <div className="h-[400px] overflow-y-auto">
              {data.pages.map((page, index) => (
                <Fragment key={index}>
                  {page.data.map((it) => (
                    <button
                      disabled={currentRoleName === 'COACH'}
                      key={it.diaryId}
                      onClick={() => handleChooseUpdates(it)}
                      className="w-full grid grid-cols-12 items-center laptopM:py-3 text-left laptopM:text-[16px] mobileM:text-[13px] font-normal laptopM:px-4 mobileM:pl-2 mobileM:py-2 hover:bg-gray-500 duration-150"
                    >
                      <p className="col-span-2">
                        {flexingFormatDate(it.createdAt, 'DD/MM')}
                      </p>
                      <p className="col-span-3 flex items-center mobileM:pl-4 laptopM:pl-0 space-x-4">
                        <img
                          className="rounded-full w-[25px] h-[25px] object-cover"
                          src={safeHttpImage(it.match.opponentClub.logoUrl)}
                        />
                        <span className="mobileM:hidden laptopM:block">
                          {it.match.opponentClub.clubName}
                        </span>
                      </p>
                      <p className="col-span-2">{`${it.match.result.yourTeam}-${it.match.result.opponents}`}</p>
                      <p className="col-span-2">{countGoal(it.match.events)}</p>
                      <p className="col-span-2">{it.match.length}</p>
                      <p className="col-span-1">
                        <ChervonRightIcon className="w-[25px] h-[25px]" />
                      </p>
                    </button>
                  ))}
                </Fragment>
              ))}
              <div className="flex justify-center py-2 " ref={ref}>
                {isFetching ? (
                  <MiniLoading color="#09E099" size={18} />
                ) : (
                  <p className="italic">Nothing more to load</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default MatchUpdates
