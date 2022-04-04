import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {
  dashboardTraining,
  dashboardTrainingUpdates,
} from 'src/atoms/dashboardTrainingAtom'
import { Loading } from 'src/components'
import { LastRangeDateType } from 'src/constants/types/dashboard-training.types'
import { fetchTraining, fetchUpdates } from 'src/service/dashboard-training'
import { PeriodFilter } from '../components/PeriodFilter'
import TrainingChart from './chart'
import TrainingData from './data'
import TrainingTable from './table'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const DashBoardTraining = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  )
}

const Component = () => {
  const [range, setRange] = useState<LastRangeDateType>('7')
  const [, setTraining] = useAtom(dashboardTraining)
  const [, setUpdates] = useAtom(dashboardTrainingUpdates)

  const { isLoading: isGettingTraining, data: responseDisplay } = useQuery(
    ['training', range],
    () => fetchTraining({ range: range, tab: 'TRAINING' })
  )

  const { isLoading: isGettingUpdates, data: responseUpdates } = useQuery(
    ['updates', range],
    () => fetchUpdates({ range: range, tab: 'TRAINING', limit: 10 })
  )

  console.log('DATA: ', responseUpdates)

  useEffect(() => {
    responseDisplay?.data && setTraining(responseDisplay?.data)
  }, [JSON.stringify(responseDisplay?.data)])

  return (
    <div>
      <PeriodFilter
        value={range}
        onChange={setRange}
        className="pb-6"
        label="Filter training period"
      />
      <Loading isLoading={isGettingTraining || isGettingUpdates}>
        <div className="space-y-6">
          <TrainingChart />
          <div className="flex space-x-6">
            <TrainingTable />
            <TrainingData />
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default DashBoardTraining
