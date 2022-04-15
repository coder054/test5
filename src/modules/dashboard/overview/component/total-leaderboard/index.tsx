import { useState } from 'react'
import { useQuery } from 'react-query'
import { Loading, LoadingCustom, TooltipCustom } from 'src/components'
import { LeaderBoard } from 'src/components/leader-board'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import {
  SvgAbove,
  SvgAllowRight,
  SvgBelow,
  SvgInfomation,
} from 'src/imports/svgs'
import { GetListLeaderBoard } from 'src/service/dashboard-overview'

const cls = require('../../overview.module.css')

interface TotalLeaderBoardProps {
  lastDateRange?: string
  setLastDateRange?: Function
  setCurrentTab?: (tab: string) => void
}

export const TotalLeaderBoard = ({
  lastDateRange,
  setCurrentTab,
}: TotalLeaderBoardProps) => {
  const [limit, setLimit] = useState<number>(13)
  const [startAfter, setStartAfter] = useState<number>(1)
  const [sorted, setSorted] = useState<string>('desc')
  const [category, setCategory] = useState<string>('HOURS')
  const [dateRange, setdateRange] = useState<string>(lastDateRange)

  const { isLoading: loading, data: dataListLeaderBoard } = useQuery(
    [
      QUERIES_DASHBOARD.LEADER_BOARD,
      limit,
      startAfter,
      sorted,
      category,
      dateRange,
    ],
    () => GetListLeaderBoard(limit, startAfter, sorted, category, dateRange)
  )

  const handleChangeShow = () => {
    if (sorted === 'asc') {
      setSorted('desc')
    } else {
      setSorted('asc')
    }
  }

  return (
    <Loading isLoading={loading}>
      <div
        className={`${cls.item} w-full pt-[16px] md:pt-[32px] pl-[16px] md:pl-[32px] pr-[16px] md:pr-[35px] pb-[16px] md:pb-[38px]`}
      >
        <div className="flex justify-between">
          <p className="text-[16px] text-[#ffffff] font-bold">
            Total leaderboard
          </p>
          <TooltipCustom
            title="This is total leaderboard tooltip description"
            placement="top-end"
          >
            <div className="order-list cursor-pointer">
              <SvgInfomation />
            </div>
          </TooltipCustom>
        </div>
        {dataListLeaderBoard && (
          <LeaderBoard master listMasterLeaderBoard={dataListLeaderBoard} />
        )}

        <div className="w-full mt-[40px]">
          <table className="w-full p-[6px] text-[12px] md:text-[14px]">
            <tr className="bg-[#13161A] text-[#A2A5AD] w-full h-[34px]">
              <td className="w-[15%] cursor-pointer" onClick={handleChangeShow}>
                <span className="float-left">Nr</span>{' '}
                <div className="mt-[3px]">
                  {sorted === 'asc' ? <SvgAbove /> : <SvgBelow />}
                </div>
              </td>
              <td className="w-[40%]">Name</td>
              <td className="w-[35%]">Team</td>
              <td className="w-[10%]">Index</td>
            </tr>
            {dataListLeaderBoard &&
              dataListLeaderBoard?.map((item, index) => (
                <tr className="h-[40px]">
                  <td className="pl-[4px]">{index + 1}</td>
                  <td>{item.userInfo.fullName}</td>
                  <td>{item.userInfo.clubName}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
          </table>
        </div>

        <div
          className="flex items-center mt-[50px] cursor-pointer w-[126px]"
          onClick={() => {
            setCurrentTab && setCurrentTab('leaderboards')
          }}
        >
          <p className="text-[12px] text-[#09E099] mr-[11px]">See all update</p>
          <SvgAllowRight />
        </div>
      </div>
    </Loading>
  )
}
