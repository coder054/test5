import clsx from 'clsx'
import { debounce } from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { ChervonRightIcon, XIcon } from 'src/components/icons'
import { ArrowDownIcon } from 'src/components/icons/ArrowDownIcon'
import { MiniLoading } from 'src/components/mini-loading'
import { ModalMui } from 'src/components/ModalMui'
import { COLOR_DIARY } from 'src/constants/mocks/colors.constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { flexingFormatDate } from 'src/hooks/functionCommon'
import DiaryUpdate from 'src/modules/update-diary'
import { fetchWellnessUpdate } from 'src/service/dashboard/wellness.service'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'

type DashboardDiaryUpdateType = {
  eatAndDrink: string
  energyLevel: string
  sleep: string
  painLevel: string
  createdAt: number
  diaryId: string
  typeOfDiary: string
}

export const DashboardDiaryUpdate = () => {
  const [queries, setQueries] = useState({
    limit: 10,
    sorted: 'asc',
    startAfter: null,
  })
  const { ref, inView } = useInView()
  const { currentRoleName } = useAuth()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedUpdates, setSelectedUpdates] = useState(undefined)

  const { data, isSuccess, isFetching, isError, fetchNextPage } =
    useInfiniteQuery(
      [QUERIES_DASHBOARD.WELLNESS_DATA, queries],
      async ({ pageParam = null }) =>
        fetchWellnessUpdate({
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

  const handleSort = debounce(() => {
    setQueries((prev) => ({
      ...prev,
      sorted: prev.sorted === 'asc' ? 'desc' : 'asc',
    }))
  }, 500)

  const handleChooseUpdates = (value: any) => {
    setSelectedUpdates(value)
    setIsOpenModal(true)
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <div className="bg-defaultBackGround laptopM:p-8 mobileM:p-2 rounded-lg">
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
          <div className="h-[850px] overflow-y-auto">
            <div className="relative">
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
                isWellness
              />
            </div>
          </div>
        </ModalMui>
        <p className="text-[18px] laptopM:text-left mobileM:text-center font-bold laptopM:mb-0 mobileM:mb-4 laptopM:pb-4">
          Diary Updates
        </p>
        <div className="grid grid-cols-6 text-left bg-[#13161A] text-[#A2A5AD] laptopM:text-[16px] mobileM:text-[13px] font-medium  px-4 py-2">
          <button
            onClick={handleSort}
            className="w-full flex items-center laptopM:space-x-4"
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

          <p>Energy</p>
          <p>Sleep</p>
          <p>Eat</p>
          <p>Pain</p>
          <p className="invisible">Action</p>
        </div>
        {isSuccess && (
          <div className="h-[350px] overflow-y-auto">
            {data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((it: DashboardDiaryUpdateType) => (
                  <button
                    disabled={currentRoleName === 'COACH'}
                    key={it.diaryId}
                    onClick={() => handleChooseUpdates(it)}
                    className="grid w-full grid-cols-6 text-left laptopM:text-[16px] mobileM:text-[13px] font-normal mobileM:pl-4 laptopM:px-4 py-2.5 hover:bg-gray-500 duration-150"
                  >
                    <p>{flexingFormatDate(it.createdAt, 'DD/MM')}</p>
                    <p
                      style={{
                        color: it?.energyLevel
                          ? COLOR_DIARY[it?.energyLevel].color
                          : 'unset',
                      }}
                    >
                      {it?.energyLevel
                        ? COLOR_DIARY[it?.energyLevel].label
                        : ''}
                    </p>
                    <p
                      style={{
                        color: it?.sleep
                          ? COLOR_DIARY[it?.sleep].color
                          : 'unset',
                      }}
                    >
                      {it?.sleep ? COLOR_DIARY[it?.sleep].label : ''}
                    </p>
                    <p
                      style={{
                        color: it?.eatAndDrink
                          ? COLOR_DIARY[it?.eatAndDrink].color
                          : 'unset',
                      }}
                    >
                      {it?.eatAndDrink
                        ? COLOR_DIARY[it?.eatAndDrink].label
                        : ''}
                    </p>
                    <p
                      style={{
                        color:
                          it.painLevel === 'No'
                            ? 'white'
                            : COLOR_DIARY[it.painLevel].color,
                      }}
                    >
                      {it.painLevel === 'No'
                        ? 'No'
                        : COLOR_DIARY[it.painLevel].label}
                    </p>
                    <span>
                      <ChervonRightIcon className="w-[25px] h-[25px]" />
                    </span>
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
  )
}
