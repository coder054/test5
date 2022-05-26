import { useEffect, useMemo, useState } from 'react'
import { Loading } from 'src/components'
import { COLOR_CHART } from 'src/constants/mocks/colors.constants'
import { WellnessChartType } from 'src/constants/types/dashboard/wellness.types'
import ChartDonut from '../../components/ChartDonus'

type WellnessPieChartProps = {
  response: WellnessChartType
  isLoading: boolean
}

export const PieChart = ({ response, isLoading }: WellnessPieChartProps) => {
  const [initial, setInitial] = useState<WellnessChartType>({
    averageDiaryRoutinePieChart: {
      bad: 0,
      good: 0,
      normal: 0,
      veryBad: 0,
      veryGood: 0,
    },
    personalDiaryRoutinePieChart: {
      bad: 0,
      good: 0,
      normal: 0,
      veryBad: 0,
      veryGood: 0,
    },
  })

  const personalChart = useMemo(() => {
    const keys = Object.keys(initial.personalDiaryRoutinePieChart)
    return keys.map((key) => ({
      color: COLOR_CHART[key].color,
      label: COLOR_CHART[key].label,
      data: initial.personalDiaryRoutinePieChart[key],
    }))
  }, [JSON.stringify(initial.personalDiaryRoutinePieChart)])

  const averageChart = useMemo(() => {
    const keys = Object.keys(initial.averageDiaryRoutinePieChart)
    return keys.map((key) => ({
      color: COLOR_CHART[key].color,
      label: COLOR_CHART[key].label,
      data: initial.averageDiaryRoutinePieChart[key],
    }))
  }, [JSON.stringify(initial.averageDiaryRoutinePieChart)])

  useEffect(() => {
    response &&
      setInitial((prev) => ({
        ...prev,
        personalDiaryRoutinePieChart: response.personalDiaryRoutinePieChart,
        averageDiaryRoutinePieChart: response.averageDiaryRoutinePieChart,
      }))
  }, [JSON.stringify(response)])

  return (
    <Loading
      isLoading={isLoading}
      className="col-span-5 bg-defaultBackGround rounded-lg laptopM:p-8 mobileM:p-2 flex items-center"
    >
      <div className="grid grid-cols-5 h-full">
        <ChartDonut label="You" value={personalChart} />
        <div className="col-span-3">
          {Object.keys(initial.personalDiaryRoutinePieChart)
            .reverse()
            .map((key, index) => (
              <div key={index} className="text-[13px] grid grid-cols-3 my-5">
                <div className="flex justify-center">
                  <p className="text-left w-[20px] text-[14px]">
                    {initial.personalDiaryRoutinePieChart[key]}%
                  </p>
                </div>
                <p
                  className="text-center text-[14px]"
                  style={{ color: COLOR_CHART[key].color }}
                >
                  {COLOR_CHART[key].label}
                </p>
                <div className="flex justify-center">
                  <p className="text-left w-[20px] text-[14px]">
                    {initial.averageDiaryRoutinePieChart[key]}%
                  </p>
                </div>
              </div>
            ))}
        </div>
        <ChartDonut label="Average" value={averageChart} />
      </div>
    </Loading>
  )
}
