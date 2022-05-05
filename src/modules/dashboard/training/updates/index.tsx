import clsx from 'clsx'
import { useAtom } from 'jotai'
import { debounce } from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-hot-toast'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { dashboardTags } from 'src/atoms/dashboardTrainingAtom'
import { XIcon } from 'src/components/icons'
import { ArrowDownIcon } from 'src/components/icons/ArrowDownIcon'
import { MiniLoading } from 'src/components/mini-loading'
import { ModalMui } from 'src/components/ModalMui'
import { COLOR_DIARY } from 'src/constants/mocks/colors.constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import {
  DashboardTabType,
  DashboardUpdatesType,
  LastRangeDateType,
} from 'src/constants/types/dashboard/training.types'
import { flexingFormatDate, upperFirst } from 'src/hooks/functionCommon'
import DiaryUpdate from 'src/modules/update-diary'
import { fetchUpdates } from 'src/service/dashboard/training.service'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
interface TrainingUpdateProps {
  range: LastRangeDateType
}

type QueryType = {
  range: LastRangeDateType
  tab: DashboardTabType
  limit: number
  sorted: 'asc' | 'desc'
  startAfter: number
}

const TrainingUpdates = ({ range }: TrainingUpdateProps) => {
  const { ref, inView } = useInView()
  const [, setTags] = useAtom(dashboardTags)
  const { currentRoleName } = useAuth()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedUpdates, setSelectedUpdates] =
    useState<DashboardUpdatesType>(undefined)

  const [queries, setQueries] = useState<QueryType>({
    range: range,
    tab: 'TRAINING',
    limit: 10,
    sorted: 'asc',
    startAfter: null,
  })

  const { data, isSuccess, isFetching, isError, fetchNextPage } =
    useInfiniteQuery(
      [QUERIES_DASHBOARD.TRAINING_UPDATE, queries],
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
    !isOpenModal && setSelectedUpdates(undefined)
  }, [isOpenModal])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    if (isSuccess) {
      setTags(
        data.pages[0].data
          .map((it: DashboardUpdatesType) => it.training.practiceTags)
          .reduce((a: string[], b: string[]) => [...a].concat([...b]), [])
      )
    }
    if (isError) toast.error('Something went wrong')
  }, [JSON.stringify(data)])

  return (
    <div className="bg-defaultBackGround rounded-lg w-full">
      <div className="laptopM:p-10 mobileM:p-4">
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
          <div className="laptopM:h-[850px] mobileM:h-screen overflow-y-auto">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpenModal(false)}
                className="absolute z-50 right-6 top-5"
              >
                <XIcon />
              </button>
              {selectedUpdates?.diaryId && (
                <DiaryUpdate
                  selected={selectedUpdates}
                  onClose={setIsOpenModal}
                />
              )}
            </div>
          </div>
        </ModalMui>
        <p className="font-bold text-[17px] mb-7 mobileM:text-center laptopM:text-left">
          Training updates
        </p>
        <div className="bg-[#13161A] text-[#A2A5AD] laptopM:text-[16px] mobileM:text-[13px] font-medium grid laptopM:grid-cols-4 mobileM:grid-cols-5 px-4 py-2">
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
          <p className="mobileM:col-span-2 laptopM:col-span-1">Category</p>
          <p>Strain</p>
          <p>Hours</p>
        </div>
        {isSuccess && (
          <div className="laptopM:h-[400px] mobileM:h-[360px] overflow-y-auto">
            {(data.pages || []).map((page, index) => (
              <Fragment key={index}>
                {page.data.map((item: DashboardUpdatesType) => (
                  <button
                    disabled={currentRoleName === 'COACH'}
                    key={item.diaryId}
                    onClick={() => handleChooseUpdates(item)}
                    className="w-full laptopM:text-[16px] mobileM:text-[13px] font-normal grid laptopM:grid-cols-4 mobileM:grid-cols-6 laptopM:px-4 laptopM:py-3 hover:bg-gray-500 duration-150 mobileM:text-left mobileM:pl-4 mobileM:py-2"
                  >
                    <p>{flexingFormatDate(item.createdAt, 'DD/MM')}</p>
                    <p className="mobileM:col-span-2 laptopM:col-span-1">
                      {upperFirst(item.training.typeOfTraining)}
                    </p>
                    <p
                      style={{
                        color:
                          COLOR_DIARY[item.training.physicallyStrain].color,
                      }}
                      className="mobileM:col-span-2 laptopM:col-span-1"
                    >
                      {upperFirst(item.training.physicallyStrain)}
                    </p>
                    <p className="laptopM:pl-4">
                      {item.training.hoursOfPractice}
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
  )
}

export default TrainingUpdates
