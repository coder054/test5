import { useEffect, useState } from 'react'
import { Loading } from 'src/components'
import { ChartCircle } from 'src/components/chart-circle'

interface DataType {
  bad: number
  good: number
  normal: number
  veryBad: number
  veryGood: number
}
interface DetailChartProps {
  dataAvg?: DataType
  dataYou?: DataType
  loading?: boolean
}

export const DetailChart = ({
  dataAvg,
  dataYou,
  loading,
}: DetailChartProps) => {
  const [arrayPercentYou, setArrayPercentYou] = useState([0, 0, 0, 0, 0])
  const [arrayPercentAvg, setArrayPercentAvg] = useState([0, 0, 0, 0, 0])

  const ArrayColor = [['#4654EA', '#07E1FF', '#09E099', '#E85CFF', '#D60C0C']]
  const ArrayLabel = [['Very good', 'Good', 'Normal', 'Bad', 'Very bad']]

  useEffect(() => {
    dataYou &&
      setArrayPercentYou([
        dataYou.veryGood,
        dataYou.good,
        dataYou.normal,
        dataYou.bad,
        dataYou.veryBad,
      ])
  }, [dataYou])
  useEffect(() => {
    dataAvg &&
      setArrayPercentAvg([
        dataAvg.veryGood,
        dataAvg.good,
        dataAvg.normal,
        dataAvg.bad,
        dataAvg.veryBad,
      ])
  }, [dataAvg])

  return (
    <Loading isLoading={loading}>
      <div className="w-full h-[174px] bg-[#13161A] mt-[32px] rounded-[8px] flex pt-[24px] overflow-x-scroll mobileM:overflow-visible">
        <div className="flex-1">
          <p className="text-center mt-[12px] text-[10px] md:text-[12px] lg:text-[16px]">
            You
          </p>
          <div className="mx-auto lg:mt-[-18px]">
            <ChartCircle
              type="wellness"
              index={0}
              ArrayPercent={arrayPercentYou}
              ArrayLabel={ArrayLabel}
              ArrayColor={ArrayColor}
            />
          </div>
        </div>
        <div className="flex-1 max-w-[20px] mobileM:ml-[4px]">
          {arrayPercentYou.map((you) => (
            <p className="text-[#ffffff] mb-[12px] text-[8px] lg:text-[10px]">
              {you}%
            </p>
          ))}
        </div>
        <div className="flex-1 text-center ml-[4px] mr-[4px] min-w-[48px]">
          <p className="text-[#4654EA] mb-[9px] text-[10px] lg:text-[12px]">
            Very good
          </p>
          <p className="text-[#07E1FF] mb-[9px] text-[10px] lg:text-[12px]">
            Good
          </p>
          <p className="text-[#09E099] mb-[9px] text-[10px] lg:text-[12px]">
            Normal
          </p>
          <p className="text-[#E85CFF] mb-[9px] text-[10px] lg:text-[12px]">
            Bad
          </p>
          <p className="text-[#D60C0C] mb-[9px] text-[10px] lg:text-[12px]">
            Very bad
          </p>
        </div>
        <div className="flex-1 max-w-[20px]">
          {arrayPercentAvg.map((you) => (
            <p className="text-[#ffffff] mb-[12px] text-[8px] lg:text-[10px]">
              {you}%
            </p>
          ))}
        </div>

        <div className="flex-1">
          <p className="text-center mt-[12px] text-[10px] md:text-[12px] lg:text-[16px]">
            Average
          </p>
          <div className="mx-auto lg:mt-[-18px]">
            <ChartCircle
              index={0}
              ArrayColor={ArrayColor}
              ArrayPercent={arrayPercentAvg}
              type="wellness"
              ArrayLabel={ArrayLabel}
            />
          </div>
        </div>
      </div>
    </Loading>
  )
}
