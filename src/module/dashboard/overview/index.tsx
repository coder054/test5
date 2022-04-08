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

      <div className="col-span-12 md:col-span-5 md:row-span-5 md:mt-[20px]">
        <TotalLeaderBoard
          lastDateRange={range}
          setLastDateRange={setRange}
          setCurrentTab={setCurrentTab}
        />
      </div>

      <div className="col-span-12 md:col-span-7 md:row-span-2 md:mt-[20px] md:ml-[20px]">
        <MatchUpdates
          lastDateRange={range}
          setLastDateRange={setRange}
          setCurrentTab={setCurrentTab}
        />
      </div>

      <div className="col-span-12 md:col-span-7 md:row-span-3 mt-[20px] md:ml-[20px]">
        <DreamTeam
          dreamTeam
          lastDateRange={range}
          setLastDateRange={setRange}
        />
      </div>

      <div className="col-span-12 md:col-span-5 md:row-span-1 mt-[20px]">
        <Wellness
          lastDateRange={range}
          setLastDateRange={setRange}
          setCurrentTab={setCurrentTab}
        />
      </div>

      <div className="col-span-12 md:col-span-7 md:row-span-1 mt-[20px] md:ml-[20px]">
        <Pain
          lastDateRange={range}
          setLastDateRange={setRange}
          setCurrentTab={setCurrentTab}
        />
      </div>
      {add ? (
        <div
          className=""
          onClick={() => {
            setAdd(false)
          }}
        >
          <ButtonAdd />
        </div>
      ) : (
        <div
          onClick={() => {
            setAdd(true)
          }}
        >
          <PopupAdd>
            <div className="w-full h-full bg-[#13161A] rounded-[7px]">
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center">
                <p className="ml-[12px]">Diary update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                <p className="ml-[32px]">- Training update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                <p className="ml-[32px]">- Match update</p>
              </div>
              <div
                className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center "
                onClick={() => {
                  router.push('/development')
                }}
              >
                <p className="ml-[12px]">Development update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                <p className="ml-[12px]">Goal update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                <p className="ml-[12px]">Height & Weight update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                <p className="ml-[12px]">Health update</p>
              </div>
            </div>
          </PopupAdd>
        </div>
      )}
    </div>
  )
}
