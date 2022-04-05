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
  const [filterMatch, setFilterMatch] =
    useState<MatchesTrainingType>('netScore')

  return (
    <div className="mb-12">
      <PeriodFilter
        value={range}
        onChange={setRange}
        className="pb-6"
        children={
          <MyInput
            select
            className="py-3"
            value={filterMatch}
            label="Match chart data"
            onChange={(_, e) => setFilterMatch(e.props.value)}
          >
            <MenuItem value="netScore">Net score</MenuItem>
            <MenuItem value="avgPoint">Avg point</MenuItem>
          </MyInput>
        }
        label="Filter matches"
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
