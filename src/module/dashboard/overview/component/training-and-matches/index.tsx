import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'
import { TrainingCircle } from './TrainingCircle'
import { TrainingTotal } from './TrainingTotal'

const cls = require('../../overview.module.css')

export const TrainingAndMatches = () => {
  return (
    <div
      className={`${cls.item} w-full pt-[32px] pl-[32px] pr-[35px] pb-[38px]`}
    >
      <div className="flex justify-between">
        <p className="text-[16px] text-[#ffffff] font-bold">
          Training & Matches
        </p>
        <div className="order-list cursor-pointer">
          <SvgInfomation />
        </div>
      </div>

      <div className="flex w-full min-h-[200px] pt-[44px]">
        <div className="flex-1">
          <TrainingTotal />
        </div>
        <div className="flex-1 ml-[32px]">
          <TrainingCircle />
        </div>
      </div>

      <div className="flex items-center mt-[50px] cursor-pointer">
        <p className="text-[12px] text-[#09E099] mr-[11px]">See all update</p>
        <SvgAllowRight />
      </div>
    </div>
  )
}
