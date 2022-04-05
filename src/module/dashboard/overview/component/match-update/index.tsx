import { useState } from 'react'
import { TooltipCustom } from 'src/components'
import {
  SvgAbove,
  SvgAllowRight,
  SvgBelow,
  SvgInfomation,
} from 'src/imports/svgs'

const cls = require('../../overview.module.css')

interface MatchUpdatesProps {}

const mockData = [
  {
    date: '12/2',
    opPonent: 'Real madrid',
    score: '2-2',
    goal: '3-2',
    min: '90',
  },
  {
    date: '12/2',
    opPonent: 'Real madrid',
    score: '2-2',
    goal: '3-2',
    min: '90',
  },
  {
    date: '12/2',
    opPonent: 'Real madrid',
    score: '2-2',
    goal: '3-2',
    min: '90',
  },
  {
    date: '12/2',
    opPonent: 'Real madrid',
    score: '2-2',
    goal: '3-2',
    min: '90',
  },
  {
    date: '12/2',
    opPonent: 'Real madrid',
    score: '2-2',
    goal: '3-2',
    min: '90',
  },
]

export const MatchUpdates = () => {
  const [showDecrease, setShowDescrease] = useState<boolean>(true)

  const handleChangeShow = () => {
    setShowDescrease(!showDecrease)
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

      <div className="w-full mt-[8px]">
        <table className="w-full p-[6px] text-[12px] md:text-[14px]">
          <tr className="bg-[#13161A] text-[#A2A5AD] w-full h-[34px]">
            <td
              className="w-[30%] md:w-[20%] cursor-pointer"
              onClick={handleChangeShow}
            >
              <span className="float-left">Date</span>{' '}
              <div className="mt-[3px]">
                {showDecrease ? <SvgAbove /> : <SvgBelow />}
              </div>
            </td>
            <td className="w-[30%]">Opponent</td>
            <td className="w-[10%]">Score</td>
            <td className="w-[20%]">Goal/Ass</td>
            <td className="w-[10%] md:w-[20%]">Min.</td>
          </tr>
          {mockData.map((item) => (
            <tr className="h-[40px]">
              <td className="md:pl-[4px]">{item.date}</td>
              <td>{item.opPonent}</td>
              <td>{item.score}</td>
              <td>{item.goal}</td>
              <td>{item.min}</td>
            </tr>
          ))}
        </table>
      </div>

      <div className="flex items-center mt-[50px] cursor-pointer">
        <p className="text-[12px] text-[#09E099] mr-[11px]">See all update</p>
        <SvgAllowRight />
      </div>
    </div>
  )
}
