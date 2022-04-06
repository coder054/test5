import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'
import { dashboardTags } from 'src/atoms/dashboardTrainingAtom'
import { Loading } from 'src/components'
import { ArrowDownIcon } from 'src/components/icons/ArrowDownIcon'
import { ModalMui } from 'src/components/ModalMui'
import {
  DashboardUpdatesType,
  LastRangeDateType,
} from 'src/constants/types/dashboard/training.types'
import { flexingFormatDate, upperFirst } from 'src/hooks/functionCommon'
import { fetchUpdates } from 'src/service/dashboard/training.service'
import SimpleBar from 'simplebar-react'
import { XIcon } from 'src/components/icons'
import DiaryUpdate from 'src/module/biography/diary'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'

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
      limit: 10,
      sorted: sort ? 'desc' : 'asc',
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
    if (isError) toast.error('An error has occurred')
  }, [JSON.stringify(responseUpdates)])

  return (
    <Loading
      isLoading={isGettingUpdates}
      className="bg-defaultBackGround rounded-lg w-full"
    >
      <div className="p-10">
        <ModalMui
          customStyle={{
            padding: 0,
            top: '50%',
            width: isMobile ? '100%' : 700,
            overflow: 'auto',
          }}
          isOpen={isOpenModal}
          onClose={setIsOpenModal}
        >
          <SimpleBar style={{ maxHeight: 850 }}>
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
              />
            </div>
          </SimpleBar>
        </ModalMui>
        <p className="font-bold text-[17px] mb-7">Training updates</p>
        <div className="bg-[#13161A] text-[#A2A5AD] text-[16px] font-medium grid grid-cols-4 px-4 py-2">
          <button
            onClick={() => setSort(!sort)}
            className="flex items-center space-x-4"
          >
            <p>Date</p>
            <span
              className={clsx('scale-150 duration-150', sort && 'rotate-180')}
            >
              <ArrowDownIcon />
            </span>
          </button>
          <p>Category</p>
          <p>Strain</p>
          <p>Hours</p>
        </div>
        {isSuccess && (
          <>
            {(responseUpdates.data || []).map((it: DashboardUpdatesType) => (
              <div
                onClick={() => handleChooseUpdates(it)}
                className="text-[15px] font-normal grid grid-cols-4 px-4 py-3 hover:bg-gray-500 cursor-pointer duration-150"
              >
                <p>{flexingFormatDate(it.createdAt, 'DD/MM')}</p>
                <p>{upperFirst(it.training.typeOfTraining)}</p>
                <p>{upperFirst(it.training.physicallyStrain)}</p>
                <p>{it.training.hoursOfPractice}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </Loading>
  )
}

export default TrainingUpdates
