import { Tooltip } from '@material-ui/core'
import { TooltipCustom } from 'src/components'
import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'
import { TrainingCircle } from './TrainingCircle'
import { TrainingTotal } from './TrainingTotal'

const cls = require('../../overview.module.css')

export const TrainingAndMatches = () => {
  return (
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

      <div className="lg:flex w-full min-h-[200px] pt-[44px]">
        <div className="md:flex-1">
          <TrainingTotal />
        </div>
        <div className="md:flex-1 md:ml-[74px] pt-[74px] md:pt-[0px]">
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
