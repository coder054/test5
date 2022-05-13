import { useState } from 'react'
import { useQuery } from 'react-query'
import { ButtonAddPopup } from 'src/components'
import { DEFAULT_RANGE } from 'src/constants/mocks/common.constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { fetchWellnessChart } from 'src/service/dashboard/wellness.service'
import { PeriodFilter } from '../components/PeriodFilter'
import { LineChart } from './chart/LineChart'
import { PieChart } from './chart/PieChart'
import { DashboardDiaryUpdate } from './updates'

const DashboardWellness = () => {
  const [range, setRange] = useState<LastRangeDateType>(DEFAULT_RANGE)
  const [filterWellness, setFilterWellness] = useState<string>('energyLevel')

  const { isLoading: isGettingWellnessChart, data: responseWellnessChart } =
    useQuery([QUERIES_DASHBOARD.WELLNESS_CHART, range, filterWellness], () =>
      fetchWellnessChart({ range: range, type: filterWellness })
    )

  return (
    <div className="mb-12">
      <PeriodFilter
        value={range}
        onChange={setRange}
        className="py-4"
        option={filterWellness}
        optionChange={setFilterWellness}
        label="Filter matches"
        options={[
          { value: 'energyLevel', label: 'Energy' },
          { value: 'sleep', label: 'Sleep' },
          { value: 'eatAndDrink', label: 'Eat & Drink' },
        ]}
        optionLabel="Wellness chart data"
      />
      <div className="space-y-6">
        <div className=" laptopM:grid laptopM:grid-cols-12 rounded-lg laptopM:space-x-6 flex flex-col space-y-6 xl:space-y-0">
          <LineChart
            response={responseWellnessChart}
            isLoading={isGettingWellnessChart}
          />
          <PieChart
            response={responseWellnessChart?.data}
            isLoading={isGettingWellnessChart}
          />
        </div>
        <DashboardDiaryUpdate />
      </div>
      <ButtonAddPopup />
    </div>
  )
}

export default DashboardWellness
