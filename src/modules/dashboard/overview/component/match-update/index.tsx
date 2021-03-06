import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Loading, TooltipCustom } from 'src/components'
import { ASC, DESC } from 'src/constants/constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { ChevronRight } from 'src/icons/chevron-right'
import {
  SvgAbove,
  SvgAllowRight,
  SvgBelow,
  SvgInfomation,
} from 'src/imports/svgs'
import { GetListDiariesReport } from 'src/service/dashboard/dashboard-overview'
import { safeHttpImage } from 'src/utils/utils'

const cls = require('../../overview.module.css')

interface MatchUpdatesProps {
  lastDateRange?: string
  setLastDateRange?: (lastDate?: string) => void
  setCurrentTab?: (tab?: string) => void
}

export const MatchUpdates = ({
  lastDateRange,
  setCurrentTab,
}: MatchUpdatesProps) => {
  const [limit, setLimit] = useState<number>(5)
  // const [startAfter, setStartAfter] = useState<number>(1)
  const [sorted, setSorted] = useState<string>(ASC)
  const [tab, setTab] = useState<string>('MATCH')
  const [dateRange, setdateRange] = useState<string>(lastDateRange)
  const [goal, setGoal] = useState<number>(0)
  const [ass, setAss] = useState<number>(0)

  const { isLoading: loading, data: dataMatchUpdate } = useQuery(
    [
      QUERIES_DASHBOARD.MATCH_UPDATE,
      limit,
      // startAfter,
      sorted,
      tab,
      lastDateRange,
    ],
    () => GetListDiariesReport(limit, sorted, tab)
  )

  const handleChangeShow = () => {
    if (sorted === ASC) {
      setSorted(DESC)
    } else {
      setSorted(ASC)
    }
  }

  const GoalAssMatch = (arrayGoal: any) => {
    if (!isEmpty(arrayGoal)) {
      arrayGoal.arrayGoal &&
        arrayGoal.arrayGoal.map((item) => {
          if (item.event === 'GOAL') {
            setGoal(item.minutes)
          } else {
            setAss(item.minutes)
          }
        })
    }
    return (
      <div>
        {goal}/{ass}
      </div>
    )
  }

  return (
    <Loading isLoading={loading}>
      <div
        className={`${cls.item} w-full pt-[16px] md:pt-[32px] pl-[16px] md:pl-[32px] pr-[16px] md:pr-[35px] pb-[16px] md:pb-[38px]`}
      >
        <div className="flex justify-between">
          <p className="text-[16px] text-[#ffffff] font-bold">Match Updates</p>
          <TooltipCustom
            title="This is total leaderboard tooltip description"
            placement="top-end"
          >
            <div className="order-list cursor-pointer">
              <SvgInfomation />
            </div>
          </TooltipCustom>
        </div>

        <div className="text-center">
          <p className="text-[#09E099] text-[16px]">
            Matches are the best training!
          </p>
          <p className="text-[#A2A5AD]">
            The matches Dashboard compares yours Match facts with your peers.
          </p>
        </div>

        <div className="w-full mt-[8px]">
          <table className="w-full p-[6px] text-[12px] md:text-[14px]">
            <tr className="bg-[#13161A] text-[#A2A5AD] w-full h-[34px]">
              <td
                className="w-[30%] md:w-[20%] cursor-pointer"
                onClick={handleChangeShow}
              >
                <span className="float-left">Date</span>{' '}
                <div className="mt-[3px]">
                  {sorted === 'asc' ? <SvgAbove /> : <SvgBelow />}
                </div>
              </td>
              <td className="w-[30%] md:w-[40%]">Opponent</td>
              <td className="w-[10%] md:w-[15%]">Score</td>
              <td className="w-[20%] md:w-[15%]">Goal/Ass</td>
              <td className="w-[10%] ">Min.</td>
            </tr>
            {(dataMatchUpdate?.data || []).map((item) => (
              <tr className="h-[44px]">
                <td className="md:pl-[4px]">
                  {dayjs(item?.createdAt).format('DD/MM')}
                </td>
                <td>
                  <div className="flex text-[10px] md:text-[14px]">
                    <img
                      src={safeHttpImage(item.match?.opponentClub?.logoUrl)}
                      className="w-[22px] h-[22px] md:w-[25.6px] md:h-[26px] mr-2 rounded-full object-cover"
                    />
                    {item.match?.opponentClub?.clubName}
                  </div>
                </td>
                <td>
                  {item.match?.result?.yourTeam}-{item.match?.result?.opponents}
                </td>
                <td>
                  <GoalAssMatch
                    arrayGoal={item.match?.events && item.match?.events}
                  />
                </td>
                <td className="flex justify-between items-center mt-[8px]">
                  {(item.match?.length && item.match?.length) || ''}
                  <ChevronRight />
                </td>
              </tr>
            ))}
          </table>
        </div>

        <div
          className="flex items-center mt-[50px] cursor-pointer w-[126px]"
          onClick={() => {
            setCurrentTab && setCurrentTab('matches')
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
