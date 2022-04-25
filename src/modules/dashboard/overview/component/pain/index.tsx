const cls = require('../../overview.module.css')
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Loading, TooltipCustom } from 'src/components'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { DashboardPainType } from 'src/constants/types'
import { BODY_PART } from 'src/constants/types/diary.types'
import { scaleToNum } from 'src/hooks/functionCommon'
import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'
import { getDashboardPain } from 'src/service/dashboard/dashboard-overview'
import { BodyPart } from 'src/modules/update-diary/components/BodyPart'
import { InjurySpot } from 'src/modules/update-diary/components/InjurySpot'

interface PainProps {
  lastDateRange?: string
  setLastDateRange?: (lastDate?: string) => void
  setCurrentTab?: (tab?: string) => void
}

export const Pain = ({ lastDateRange, setCurrentTab }: PainProps) => {
  const [dataChart, setDataChart] = useState<DashboardPainType>({
    bodyChart: [],
    columnChart: {
      injuryAreaF: [0, 9, 55, 3, 3, 6, 24, 0],
      injuryAreaB: [0, 0, 100, 0, 0, 0, 0, 0],
    },
  })

  const { isLoading: loading, data: dataPain } = useQuery(
    [QUERIES_DASHBOARD.PAIN_DATA, lastDateRange],
    () => getDashboardPain(lastDateRange)
  )

  useEffect(() => {
    dataPain && setDataChart(dataPain)
  }, [dataPain])

  const getPositon = (position: string): string => {
    let res = position.charAt(0)
    for (let i = 1; i < position.length; i++) {
      if (position[i] === '-') {
        res += position[i + 1]
      }
    }

    return res
  }

  return (
    <Loading isLoading={loading}>
      <div
        className={`${cls.item} w-full pt-[16px] md:pt-[32px] pl-[16px] md:pl-[32px] pr-[16px] md:pr-[35px] pb-[16px] md:pb-[38px]`}
      >
        <div className="flex justify-between">
          <p className="text-[16px] text-[#ffffff] font-bold">Pain</p>
          <TooltipCustom
            title="This is total leaderboard tooltip description"
            placement="top-end"
          >
            <div className="order-list cursor-pointer">
              <SvgInfomation />
            </div>
          </TooltipCustom>
        </div>

        <div className="w-[226px] mobileM:w-[265px] md:w-full overflow-y-auto xl:overflow-hidden">
          <div className="w-[428px] md:w-full">
            <div className="w-[428px] md:w-full flex justify-between mt-[46px]">
              <div className="flex-1">
                <div className="w-full ml-[35%] mb-[24px]">Front</div>
                <div className="w-full flex mr-[1.5px]">
                  <div className=" flex-1 ">
                    <div className="mx-auto bg-front-body relative w-[214px] h-[440px] bg-no-repeat bg-center cursor-pointer duration-150">
                      {dataChart &&
                        dataChart.bodyChart.map((item) => {
                          const keyPositon: string = getPositon(item.injuryArea)
                          const result = Object.keys(BODY_PART).findIndex(
                            (item) => item === keyPositon
                          )

                          let res = null
                          if (keyPositon.charAt(0) === 'F') {
                            res = (
                              <div className="absolute top-0 left-0">
                                <InjurySpot
                                  level={item.value * 20}
                                  spot={Object.values(BODY_PART)[result].spot}
                                  showLevel
                                />
                              </div>
                            )
                          }

                          return <>{res}</>
                        })}
                    </div>
                  </div>

                  <div className="h-[440px] float-right w-[60px]  flex flex-col mr-[1.5px]">
                    {dataChart?.columnChart.injuryAreaF.map((item) => (
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
                <div className="w-full mb-[24px] ml-[54%]">Back</div>
                <div className="w-full flex">
                  <div className="h-[440px] float-left w-[60px] flex flex-col ml-[1.5px]">
                    {dataChart?.columnChart.injuryAreaB.map((item) => (
                      <div className="w-full h-[55px] relative">
                        <div
                          style={{ width: `${item * 0.6}px` }}
                          className="absolute bg-[#C4C4C4] left-0 h-full"
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="bg-back-body relative w-[214px] h-[440px] mx-auto bg-no-repeat bg-center cursor-pointer duration-150">
                      {dataChart &&
                        dataChart.bodyChart.map((item) => {
                          const keyPositon: string = getPositon(item.injuryArea)
                          const result = Object.keys(BODY_PART).findIndex(
                            (item) => item === keyPositon
                          )

                          let res = null
                          if (keyPositon.charAt(0) === 'B') {
                            res = (
                              <div className="absolute top-0 left-0">
                                <InjurySpot
                                  level={item.value * 20}
                                  spot={Object.values(BODY_PART)[result].spot}
                                  showLevel
                                />
                              </div>
                            )
                          }

                          return <>{res}</>
                        })}
                    </div>
                  </div>
                </div>
                <div className="mt-[45px] w-full">
                  <div className="w-[12px] h-[12px] bg-[#D60C0C] rounded-full mt-[6px] mr-[4px] float-left ml-[32px]"></div>
                  <span className="float-left text-[#D60C0C]">You</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex items-center mt-[54px] cursor-pointer w-[126px]"
          onClick={() => {
            setCurrentTab && setCurrentTab('pain')
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
