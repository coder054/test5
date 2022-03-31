import React, { useState } from 'react'
import { SvgFilter } from 'src/imports/svgs'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { Analytics } from './component/analytics'
import { TrainingAndMatches } from './component/training-and-matches'

export const Overview = () => {
  const { currentRoleName } = useAuth()
  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-5">
      <div className="space-y-7">
        <div className="w-full flex flex-row-reverse">
          <div className="cursor-pointer">
            <SvgFilter />
          </div>
          <span className="text-[#09E099] text-[14px] mr-[20px]">
            2022 - last 30 days
          </span>
        </div>

        <Analytics />

        <div className="pt-[40px]">
          <TrainingAndMatches />
        </div>
      </div>
    </div>
  )
}
