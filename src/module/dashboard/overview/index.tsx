import React, { useState } from 'react'
import { SvgFilter } from 'src/imports/svgs'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { Analytics } from './component/analytics'
import { DreamTeam } from './component/dream-team'
import { MatchUpdates } from './component/match-update'
import { Pain } from './component/pain'
import { TotalLeaderBoard } from './component/total-leaderboard'
import { TrainingAndMatches } from './component/training-and-matches'
import { Wellness } from './component/wellness'

export const Overview = () => {
  const { currentRoleName } = useAuth()
  const [loading, setLoading] = useState(false)

  return (
    <div className="grid grid-cols-12 space-y-7 pb-[108px]">
      <div className="w-full flex flex-row-reverse col-span-12">
        <div className="cursor-pointer">
          <SvgFilter />
        </div>
        <span className="text-[#09E099] text-[14px] mr-[20px]">
          2022 - last 30 days
        </span>
      </div>

      <div className="col-span-12 row-span-4 md:row-span-2 lg:row-span-1">
        <Analytics />
      </div>

      <div className="col-span-12">
        <TrainingAndMatches />
      </div>

      <div className="col-span-12 md:col-span-5 md:row-span-5 md:mt-[20px]">
        <TotalLeaderBoard />
      </div>

      <div className="col-span-12 md:col-span-7 md:row-span-2 md:mt-[20px] md:ml-[20px]">
        <MatchUpdates />
      </div>

      <div className="col-span-12 md:col-span-7 md:row-span-3 mt-[20px] md:ml-[20px]">
        <DreamTeam dreamTeam />
      </div>

      <div className="col-span-12 md:col-span-5 md:row-span-1 mt-[20px]">
        <Wellness />
      </div>

      <div className="col-span-12 md:col-span-7 md:row-span-1 mt-[20px] md:ml-[20px]">
        <Pain />
      </div>

      <div className=""></div>
    </div>
  )
}
