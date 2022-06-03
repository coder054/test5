import { Tooltip } from '@material-ui/core'
import { useQuery } from 'react-query'
import { Loading, LoadingCustom, TooltipCustom } from 'src/components'
import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'
import { TrainingCircle } from './TrainingCircle'
import { TrainingTotal } from './TrainingTotal'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { getDiariesStatistic } from 'src/service/dashboard/dashboard-overview'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { dashboardTrainingAndMatchAtom } from 'src/atoms/dashboard'

const cls = require('../../overview.module.css')

interface MatchUpdatesProps {
  lastDateRange?: string
  setLastDateRange?: (lastDate?: string) => void
  setCurrentTab?: (tab?: string) => void
}

export const TrainingAndMatches = ({
  lastDateRange,
  setCurrentTab,
}: MatchUpdatesProps) => {
  const [dashboardTab, setDashboardTab] = useState<string>('TOTAL')
  const [dataTrainingAndMatch, setDataTrainingAndMatch] = useAtom(
    dashboardTrainingAndMatchAtom
  )

  const { isLoading: loading, data: dataDiariesStatistic } = useQuery(
    [QUERIES_DASHBOARD.DIARIES_STATISTIC, lastDateRange, dashboardTab],
    () => getDiariesStatistic(lastDateRange, dashboardTab)
  )

  useEffect(() => {
    dataDiariesStatistic && setDataTrainingAndMatch(dataDiariesStatistic)
  }, [dataDiariesStatistic])

  return (
    <Loading isLoading={loading}>
      <div
        className={`${cls.item} w-full pt-[16px] md:pt-[32px] pl-[16px] md:pl-[32px] pr-[15px] md:pr-[35px] pb-[18px] md:pb-[38px]`}
      >
        <div className="flex justify-between">
          <p className="text-[16px] text-[#ffffff] font-bold">
            Training & Matches
          </p>
          <TooltipCustom
            title="This is training & matches tootip description"
            placement="top-end"
          >
            <div className="order-list cursor-pointer">
              <SvgInfomation />
            </div>
          </TooltipCustom>
        </div>

        <div className="text-center">
          <p className="text-[#09E099] text-[16px]">
            Training makes you better!
          </p>
          <p className="text-[#A2A5AD]">
            The Training Dashboard compares your Training hours with your peers.
          </p>
        </div>

        <div className="lg:flex w-full min-h-[300px] pt-[44px]">
          <div className="lg:flex-1">
            <TrainingTotal />
          </div>
          <div className="lg:flex-1 md:pl-[42px] lg:ml-[64px] pt-[74px] lg:pt-[0px]">
            <TrainingCircle />
          </div>
        </div>

        <div
          className="flex items-center mt-[50px] cursor-pointer w-[126px]"
          onClick={() => {
            setCurrentTab && setCurrentTab('training')
          }}
        >
          <p className="text-[12px] text-[#09E099] mr-[11px]">
            See all updates
          </p>
          <SvgAllowRight />
        </div>
      </div>
    </Loading>
  )
}
