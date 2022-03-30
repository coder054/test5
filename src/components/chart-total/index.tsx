import { useEffect, useMemo, useState } from 'react'
const cls = require('./chart-total.module.css')

interface ChartTotalProps {
  chart?: any
  index?: number
}

export const ChartTotal = ({ index, chart }: ChartTotalProps) => {
  const [youPercent, setYouPercent] = useState([])
  const [avgPercent, setAvgPercent] = useState([])
  const [youHeight, setYouHeight] = useState([])
  const [avgHeight, setAvgHeight] = useState([])

  const keyYou = useMemo(() => {
    return Object.keys(Object.values(chart)[0])
  }, [chart])

  const keyAvg = useMemo(() => {
    return Object.keys(Object.values(chart)[1])
  }, [chart])

  const valueYou = useMemo(() => {
    return Object.values(Object.values(chart)[0])
  }, [chart])

  const valueAvg = useMemo(() => {
    return Object.values(Object.values(chart)[1])
  }, [chart])

  const totalYou = useMemo(() => {
    if (valueYou) {
      return valueYou.reduce((a, b) => a + b, 0)
    }
    return 0
  }, [chart, valueYou])

  const totalAvg = useMemo(() => {
    if (valueAvg) {
      return valueAvg.reduce((a, b) => a + b, 0)
    }
    return 0
  }, [chart, valueAvg])

  useEffect(() => {
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
  }, [valueYou, valueAvg, chart])

  return (
    <div className="mx-auto">
      {index && index === 1 && (
        <p className="font-bold text-[16px] text-center">Training</p>
      )}
      {index && index === 2 && (
        <p className="font-bold text-[16px] text-center">Matches</p>
      )}
      {index && index === 3 && (
        <p className="font-bold text-[16px] text-center">Total</p>
      )}

      <div className="flex w-[92px] mt-[32px] justify-between gap-1">
        <div className="flex-1 relative">
          <div className="h-[164px]">
            <p className="text-[12px] text-center">{totalYou}h</p>
            {keyYou &&
              keyYou.map((key, index) => (
                <div
                  style={{
                    height: `${youPercent[index] * 1.6}px`,
                  }}
                  className="bg-[#4654EA] rounded-[4px] text-[16px] mb-[4px] flex items-center"
                >
                  <p className="mx-auto">{key}</p>
                </div>
              ))}
          </div>
          <p className="text-[#4654EA] text-[14px] mt-[8px] text-center absolute bottom-0">
            YOU
          </p>
        </div>
        <div className="flex-1">
          <p className="text-[12px] text-center">{totalAvg}h</p>
          <div className="h-[164px] flex-col">
            {keyAvg &&
              keyAvg.map((key, index) => (
                <div
                  style={{ height: `${avgPercent[index] * 1.6}px` }}
                  className={`${cls.avg} rounded-[4px] text-[16px] mb-[4px] flex items-center`}
                >
                  <p className="mx-auto">{key}</p>
                </div>
              ))}
          </div>
          <p className="text-[#A2A5AD] text-[14px] mt-[8px] text-center">AVG</p>
        </div>
      </div>
    </div>
  )
}
