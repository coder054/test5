import { MenuItem } from '@mui/material'
import { useState } from 'react'
import { MyInput } from 'src/components'
import { MatchesTrainingType } from 'src/constants/types/dashboard/matches.types'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { PeriodFilter } from '../components/PeriodFilter'
import { LineChart } from './chart/LineChart'
import { MatchesTable } from './table'
import MatchUpdates from './updates'

const DashboardMatches = () => {
  const [range, setRange] = useState<LastRangeDateType>('7')
  const [filterMatch, setFilterMatch] = useState<MatchesTrainingType | string>(
    'netScore'
  )

  return (
    <div className="mb-12">
      <PeriodFilter
        value={range}
        onChange={setRange}
        className="pb-6"
        option={filterMatch}
        optionChange={setFilterMatch}
        label="Filter matches"
        options={[
          { value: 'netScore', label: 'Net score' },
          { value: 'avgPoint', label: 'Avg point' },
        ]}
        optionLabel="Match chart data"
      />
      <div className="space-y-6">
        <div className=" laptopM:grid laptopM:grid-cols-12 rounded-lg laptopM:space-x-6 flex flex-col space-y-6 xl:space-y-0">
          <LineChart range={range} filter={filterMatch} />
          <MatchesTable range={range} />
        </div>
        <MatchUpdates range={range} />
      </div>
    </div>
  )
}

export default DashboardMatches
