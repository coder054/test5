const cls = require('../../overview.module.css')
import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'

export const Pain = () => {
  const mockDataFront = {
    columnChart: {
      injuryAreaF: [10, 20, 30, 40, 50, 60, 80, 100],
      injuryAreaB: [10, 50, 15, 77, 20, 100, 28, 40],
    },
  }
  // console.log('mockDataFront', mockDataFront.columnChart.injuryAreaF[0])

  return (
    <div
      className={`${cls.item} w-full pt-[32px] pl-[32px] pr-[35px] pb-[38px]`}
    >
      <div className="flex justify-between">
        <p className="text-[16px] text-[#ffffff] font-bold">Pain</p>
        <div className="order-list">
          <SvgInfomation />
        </div>
      </div>

      <div className="flex justify-between mt-[80px]">
        <div className="flex-1">
          <div className="w-full ml-[40%] mb-[24px]">Front</div>
          <div className="w-full flex mr-[1.5px]">
            <div className="bg-front-body relative w-[214px] h-[440px] mx-auto flex-1 bg-no-repeat bg-center cursor-pointer duration-150"></div>
            <div className="h-[440px] float-right w-[60px]  flex flex-col mr-[1.5px]">
              {mockDataFront.columnChart.injuryAreaF.map((item) => (
                <div className="w-full h-[55px] relative">
                  <div
                    style={{ width: `${item * 0.6}px` }}
                    className="absolute bg-[#C4C4C4] right-0 h-full"
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[45px] w-full">
            <span className="float-right text-[#A2A5AD]">Average</span>
            <div className="w-[12px] h-[12px] bg-[#A2A5AD] rounded-full mt-[6px] mr-[4px] float-right"></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full mb-[24px] ml-[45%]">Back</div>
          <div className="w-full">
            <div className="h-[440px] float-left w-[60px] flex flex-col ml-[1.5px]">
              {mockDataFront.columnChart.injuryAreaF.map((item) => (
                <div className="w-full h-[55px] relative">
                  <div
                    style={{ width: `${item * 0.6}px` }}
                    className="absolute bg-[#C4C4C4] left-0 h-full"
                  ></div>
                </div>
              ))}
            </div>
            <div className="bg-back-body relative w-[214px] h-[440px] mx-auto bg-no-repeat bg-center cursor-pointer duration-150"></div>
          </div>
          <div className="mt-[45px] w-full">
            <div className="w-[12px] h-[12px] bg-[#D60C0C] rounded-full mt-[6px] mr-[4px] float-left ml-[32px]"></div>
            <span className="float-left text-[#D60C0C]">You</span>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-[54px] cursor-pointer">
        <p className="text-[12px] text-[#09E099] mr-[11px]">See all update</p>
        <SvgAllowRight />
      </div>
    </div>
  )
}
