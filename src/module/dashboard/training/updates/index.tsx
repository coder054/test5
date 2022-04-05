import { useQuery } from 'react-query'
import { Loading } from 'src/components'
import { ChervonRightIcon } from 'src/components/icons'
import {
  LastRangeDateType,
  DashboardUpdatesType,
} from 'src/constants/types/dashboard/training.types'
import { flexingFormatDate, upperFirst } from 'src/hooks/functionCommon'
import { fetchUpdates } from 'src/service/dashboard-training'
import { useAtom } from 'jotai'
import { dashboardTags } from 'src/atoms/dashboardTrainingAtom'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ArrowDownIcon } from 'src/components/icons/ArrowDownIcon'
import clsx from 'clsx'
import dayjs from 'dayjs'

type TrainingUpdateProps = {
  range: LastRangeDateType
}

const TrainingUpdates = ({ range }: TrainingUpdateProps) => {
  const [, setTags] = useAtom(dashboardTags)
  const [sort, setSort] = useState<boolean>(false)

  const {
    isLoading: isGettingUpdates,
    data: responseUpdates,
    isSuccess,
    isError,
  } = useQuery(['updates', range, sort], () =>
    fetchUpdates({
      range: range,
      tab: 'TRAINING',
      limit: 10,
      sorted: 'desc',
    })
  )

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
              <div className="text-[15px] font-normal grid grid-cols-4 px-4 py-3 hover:bg-gray-500 cursor-pointer duration-150">
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
