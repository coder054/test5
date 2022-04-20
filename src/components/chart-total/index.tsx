import { useEffect, useMemo, useState } from 'react'
import {
  AverageSessionsType,
  MatchHours,
  TotalHours,
} from 'src/constants/types/dashboard/training.types'
const cls = require('./chart-total.module.css')

interface ChartTotalProps {
  personalHours?: AverageSessionsType | MatchHours | TotalHours
  averageHours?: AverageSessionsType | MatchHours | TotalHours
  index?: number
}

export const ChartTotal = ({
  index,
  personalHours,
  averageHours,
}: ChartTotalProps) => {
  const [youPercent, setYouPercent] = useState([])
  const [avgPercent, setAvgPercent] = useState([])
  const [youHeight, setYouHeight] = useState([])
  const [avgHeight, setAvgHeight] = useState([])

  const keyYou = useMemo(() => {
    return Object.keys(averageHours)
  }, [personalHours])

  const keyAvg = useMemo(() => {
    return Object.keys(averageHours)
  }, [averageHours])

  const valueYou = useMemo(() => {
    return Object.values(personalHours)
  }, [personalHours])

  const valueAvg = useMemo(() => {
    return Object.values(averageHours)
  }, [averageHours])

  const totalYou = useMemo(() => {
    if (valueYou) {
      return valueYou.reduce((a, b) => a + b, 0)
    }
    return 0
  }, [personalHours, valueYou])

  const totalAvg = useMemo(() => {
    if (valueAvg) {
      return valueAvg.reduce((a, b) => a + b, 0)
    }
    return 0
  }, [averageHours, valueAvg])

  useEffect(() => {
    if (totalYou || totalAvg) {
      valueYou &&
        valueYou.forEach((elm) => {
          const pecent =
            totalYou >= totalAvg
              ? Math.round((elm / totalYou) * 100)
              : Math.round((elm / totalAvg) * 100)

          setYouPercent((prev) => [...prev, pecent])
        })
      valueAvg &&
        valueAvg.forEach((elm) => {
          const pecent =
            totalYou >= totalAvg
              ? Math.round((elm / totalYou) * 100)
              : Math.round((elm / totalAvg) * 100)

          setAvgPercent((prev) => [...prev, pecent])
        })
    } else {
    }
  }, [valueYou, valueAvg, personalHours, averageHours])

  return (
    <div className="mx-auto">
      {index && index === 1 && (
        <p className="font-bold text-[14px] md:text-[16px] text-center">
          Training
        </p>
      )}
      {index && index === 2 && (
        <p className="font-bold text-[14px] md:text-[16px] text-center">
          Matches
        </p>
      )}
      {index && index === 3 && (
        <p className="font-bold text-[14px] md:text-[16px] text-center">
          Total
        </p>
      )}

      <div className="w-[62px] md:w-[92px] h-[168px] md:h-[208px] relative">
        <div className="flex w-full mt-[52px] md:mt-[32px] gap-1 absolute top-0 h-full">
          <div className="flex-1 relative">
            <div className="h-[152px] md:h-[184px] absolute bottom-[28px] w-full">
              <div className="absolute bottom-0 w-full">
                <p className="text-[10px] md:text-[12px] text-center -mb-[4px]">
                  {totalYou}h
                </p>
                <div className="w-full">
                  {keyYou &&
                    keyYou.map((key, index) => (
                      <>
                        {youPercent[index] ? (
                          <div
                            style={{
                              height: `${youPercent[index] * 1.6}px`,
                            }}
                            className={`bg-[#4654EA] rounded-[4px] text-[14px] mdtext-[16px] mt-[4px] flex items-center`}
                          >
                            {youPercent[index] >= 8 ? (
                              <p className="mx-auto">
                                {key.charAt(0).toUpperCase()}
                              </p>
                            ) : null}
                          </div>
                        ) : null}
                      </>
                    ))}
                </div>
              </div>
            </div>
            <p className="text-[#4654EA] text-[12px] md:text-[14px] mt-[8px] ml-[6px] text-center absolute bottom-0">
              YOU
            </p>
          </div>

          <div className="flex-1 relative">
            <div className="h-[184px] absolute bottom-[28px] w-full">
              <div className="absolute bottom-0 w-full">
                <p className="text-[12px] text-center -mb-[4px]">{totalAvg}h</p>
                <div className="w-full">
                  {keyAvg &&
                    keyAvg.map((key, index) => (
                      <>
                        {avgPercent[index] ? (
                          <div
                            style={{
                              height: `${avgPercent[index] * 1.6}px`,
                            }}
                            className={` ${cls.avg} rounded-[4px] text-[16px] mt-[4px] flex items-center`}
                          >
                            {avgPercent[index] >= 8 ? (
                              <p className="mx-auto">
                                {key.charAt(0).toUpperCase()}
                              </p>
                            ) : null}
                          </div>
                        ) : null}
                      </>
                    ))}
                </div>
              </div>
            </div>
            <p className="text-[#A2A5AD] text-[12px] md:text-[14px] mt-[8px] ml-[6px] text-center absolute bottom-0">
              AVG
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}