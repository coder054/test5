import React, { useState } from 'react'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { PeriodFilter } from '../components/PeriodFilter'
import { Analytics } from './component/analytics'
import { DreamTeam } from './component/dream-team'
import { MatchUpdates } from './component/match-update'
import { Pain } from './component/pain'
import { TotalLeaderBoard } from './component/total-leaderboard'
import { TrainingAndMatches } from './component/training-and-matches'
import { ButtonAdd } from 'src/components/ButtonAdd'
import { Wellness } from './component/wellness'
import { PopupAdd } from 'src/components/popup-add'
import { useRouter } from 'next/router'
import { ButtonAddPopup } from 'src/components'

interface OverviewProps {
  setCurrentTab?: (tab: string) => void
}

export const Overview = ({ setCurrentTab }: OverviewProps) => {
  const [range, setRange] = useState<LastRangeDateType>('30')
  const [add, setAdd] = useState<boolean>(true)
  const router = useRouter()
  return (
    <div className="grid grid-cols-12 space-y-7 pb-[108px]">
      <div className="w-full flex flex-row-reverse col-span-12">
        <PeriodFilter
          value={range}
          onChange={setRange}
          label="Filter your Dashboard period"
        />
      </div>

      <div className="col-span-12 row-span-4 md:row-span-2 lg:row-span-1">
        <Analytics lastDateRange={range} setLastDateRange={setRange} />
      </div>

      <div className="col-span-12">
        <TrainingAndMatches
          lastDateRange={range}
          setLastDateRange={setRange}
          setCurrentTab={setCurrentTab}
        />
      </div>

      <div className="col-span-12 lg:col-span-5 lg:row-span-5 lg:mt-[20px]">
        <TotalLeaderBoard
          lastDateRange={range}
          setLastDateRange={setRange}
          setCurrentTab={setCurrentTab}
        />
      </div>

      <div className="col-span-12 lg:col-span-7 lg:row-span-2 lg:mt-[20px] lg:ml-[20px]">
        <MatchUpdates
          lastDateRange={range}
          setLastDateRange={setRange}
          setCurrentTab={setCurrentTab}
        />
      </div>

      <div className="col-span-12 lg:col-span-7 lg:row-span-3 mt-[20px] lg:ml-[20px]">
        <DreamTeam
          dreamTeam
          lastDateRange={range}
          setLastDateRange={setRange}
        />
      </div>

      <div className="col-span-12 lg:col-span-5 lg:row-span-1 mt-[20px]">
        <Wellness
          lastDateRange={range}
          setLastDateRange={setRange}
          setCurrentTab={setCurrentTab}
        />
      </div>

      <div className="col-span-12 lg:col-span-7 lg:row-span-1 mt-[20px] lg:ml-[20px]">
        <Pain
          lastDateRange={range}
          setLastDateRange={setRange}
          setCurrentTab={setCurrentTab}
        />
      </div>

      <ButtonAddPopup />
    </div>
  )
}
