import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { dashboardTraining } from 'src/atoms/dashboardTrainingAtom'
import { Loading } from 'src/components'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { fetchTraining } from 'src/service/dashboard-training'
import { PeriodFilter } from '../components/PeriodFilter'
import TrainingChart from './chart'
import TrainingTable from './table'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import TrainingUpdates from './updates'

const DashBoardTraining = () => {
  const [range, setRange] = useState<LastRangeDateType>('7')
  const [, setTraining] = useAtom(dashboardTraining)

  const { isLoading: isGettingTraining, data: responseDisplay } = useQuery(
    [QUERIES_DASHBOARD.TRAINING_CHART, range],
    () => fetchTraining({ range: range, tab: 'TRAINING' })
  )

  useEffect(() => {
    responseDisplay && setTraining(responseDisplay?.data)
  }, [JSON.stringify(responseDisplay?.data)])

  return (
    <div className="mb-12">
      <PeriodFilter
        value={range}
        onChange={setRange}
        className="pb-6"
        label="Filter training period"
      />
      <div>
        <div className="space-y-6">
          <Loading isLoading={isGettingTraining}>
            <TrainingChart />
          </Loading>
          <div className="laptopM:flex laptopM:space-x-6 space-y-6 laptopM:space-y-0">
            <TrainingTable />
            <TrainingUpdates range={range} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoardTraining
