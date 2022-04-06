import dayjs from 'dayjs'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { LoadingCustom, TooltipCustom } from 'src/components'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { ChevronRight } from 'src/icons/chevron-right'
import {
  SvgAbove,
  SvgAllowRight,
  SvgBelow,
  SvgInfomation,
} from 'src/imports/svgs'
import { GetListDiariesReport } from 'src/service/dashboard-overview'

const cls = require('../../overview.module.css')

interface MatchUpdatesProps {
  lastDateRange?: string
  setLastDateRange?: (lastDate?: string) => void
}

export const MatchUpdates = ({ lastDateRange }: MatchUpdatesProps) => {
  const [limit, setLimit] = useState<number>(5)
  const [startAfter, setStartAfter] = useState<number>(1)
  const [sorted, setSorted] = useState<string>('asc')
  const [tab, setTab] = useState<string>('MATCH')
  const [dateRange, setdateRange] = useState<string>(lastDateRange)

  const { isLoading: loading, data: dataMatchUpdate } = useQuery(
    [QUERIES_DASHBOARD.MATCH_UPDATE, limit, startAfter, sorted, tab, dateRange],
    () => GetListDiariesReport(limit, startAfter, sorted, tab)
  )

  const handleChangeShow = () => {
    if (sorted === 'asc') {
      setSorted('desc')
    } else {
      setSorted('asc')
    }
  }

  return (
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

      {loading ? (
        <LoadingCustom />
      ) : (
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
            {(dataMatchUpdate.data || []).map((item) => (
              <tr className="h-[40px]">
                <td className="md:pl-[4px]">
                  {dayjs(item.createdAt).format('DD/MM')}
                </td>
                <td>
                  <div className="flex">
                    <img
                      src={item.match.opponentClub.logoUrl}
                      className="w-[25.6px] h-[26px] mr-2"
                    />
                    {item.match.opponentClub.clubName}
                  </div>
                </td>
                <td>
                  {item.match.result.yourTeam}-{item.match.result.opponents}
                </td>
                <td>
                  {item.match.result.opponents}-{item.match.result.yourTeam}
                </td>
                <td className="flex justify-between items-center mt-[8px]">
                  {item.match.events[0].minutes}
                  <ChevronRight />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}

      <div className="flex items-center mt-[50px] cursor-pointer">
        <p className="text-[12px] text-[#09E099] mr-[11px]">See all update</p>
        <SvgAllowRight />
      </div>
    </div>
  )
}
