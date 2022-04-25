import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'
import { dashboardTags } from 'src/atoms/dashboardTrainingAtom'
import { Loading } from 'src/components'
import { XIcon } from 'src/components/icons'
import { ArrowDownIcon } from 'src/components/icons/ArrowDownIcon'
import { ModalMui } from 'src/components/ModalMui'
import { COLOR_DIARY } from 'src/constants/mocks/colors.constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import {
  DashboardUpdatesType,
  LastRangeDateType,
} from 'src/constants/types/dashboard/training.types'
import { flexingFormatDate, upperFirst } from 'src/hooks/functionCommon'
import DiaryUpdate from 'src/modules/update-diary'
import { fetchUpdates } from 'src/service/dashboard/training.service'

type TrainingUpdateProps = {
  range: LastRangeDateType
}

const TrainingUpdates = ({ range }: TrainingUpdateProps) => {
  const [, setTags] = useAtom(dashboardTags)
  const [sort, setSort] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedUpdates, setSelectedUpdates] = useState(undefined)

  const {
    isLoading: isGettingUpdates,
    data: responseUpdates,
    isSuccess,
    isError,
  } = useQuery([QUERIES_DASHBOARD.TRAINING_DATA, range, sort], () =>
    fetchUpdates({
      range: range,
      tab: 'TRAINING',
      limit: 100,
      sorted: sort ? 'asc' : 'desc',
    })
  )

  const handleChooseUpdates = (value: any) => {
    setSelectedUpdates(value)
    setIsOpenModal(true)
  }

  useEffect(() => {
    !isOpenModal && setSelectedUpdates(undefined)
  }, [isOpenModal])

  useEffect(() => {
    if (isSuccess) {
      setTags(
        responseUpdates.data
          .map((it: DashboardUpdatesType) => it.training.practiceTags)
          .reduce((a: string[], b: string[]) => [...a].concat([...b]), [])
      )
    }
    if (isError) toast.error('Something went wrong')
  }, [JSON.stringify(responseUpdates)])

  return (
    <Loading
      isLoading={isGettingUpdates}
      className="bg-defaultBackGround rounded-lg w-full"
    >
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
            onClick={() => setSort(!sort)}
            className="flex items-center laptopM:space-x-4"
          >
            <p>Date</p>
            <span
              className={clsx('scale-150 duration-150', sort && 'rotate-180')}
            >
              <ArrowDownIcon />
            </span>
          </button>
          <p className="mobileM:col-span-2 laptopM:col-span-1">Category</p>
          <p>Strain</p>
          <p>Hours</p>
        </div>
        {isSuccess && (
          <div className="laptopM:h-[360px] mobileM:h-[360px] overflow-y-auto">
            {(responseUpdates.data || []).map((it: DashboardUpdatesType) => (
              <button
                key={it.diaryId}
                onClick={() => handleChooseUpdates(it)}
                className="w-full laptopM:text-[16px] mobileM:text-[13px] font-normal grid laptopM:grid-cols-4 mobileM:grid-cols-6 laptopM:px-4 laptopM:py-3 hover:bg-gray-500 duration-150 mobileM:text-left mobileM:pl-4 mobileM:py-2"
              >
                <p>{flexingFormatDate(it.createdAt, 'DD/MM')}</p>
                <p className="mobileM:col-span-2 laptopM:col-span-1">
                  {upperFirst(it.training.typeOfTraining)}
                </p>
                <p
                  style={{
                    color: COLOR_DIARY[it.training.physicallyStrain].color,
                  }}
                  className="mobileM:col-span-2 laptopM:col-span-1"
                >
                  {upperFirst(it.training.physicallyStrain)}
                </p>
                <p>{it.training.hoursOfPractice}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </Loading>
  )
}

export default TrainingUpdates
