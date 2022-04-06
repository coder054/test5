import { ApexOptions } from 'apexcharts'
import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { dashboardTraining } from 'src/atoms/dashboardTrainingAtom'
import { Chart } from 'src/components'
import { upperFirst } from 'src/hooks/functionCommon'

export const TrainingCircleChart = () => {
  const [training] = useAtom(dashboardTraining)

  const generateData = useCallback(
    (type: 'trainingType' | 'personalTrainingCategory') => {
      const COLOR = ['#E85CFF', '#4654EA', '#07E1FF', '#09E099']
      return Object.keys(training[type])
        .map((it, index) => ({
          color: COLOR[index],
          data: training[type][it],
          label: upperFirst(it),
        }))
        .sort((a, b) => b.data - a.data)
    },
    [JSON.stringify(training)]
  )

  const renderChart = useCallback(
    (type: 'trainingType' | 'personalTrainingCategory') => {
      const data = generateData(type)
      const chartOptions: ApexOptions = {
        chart: {
          background: 'transparent',
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        colors: data.map((item) => item.color),
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        labels: data.map((item) => item.label),
        legend: {
          show: false,
        },
        stroke: {
          width: 0,
        },
      }

      const chartSeries = data.map((item) => item.data)
      return { option: chartOptions, series: chartSeries }
    },
    [JSON.stringify(training)]
  )

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-center space-y-8">
        <p className="font-bold text-[17px]">Category</p>
        <Chart
          height={120}
          options={renderChart('personalTrainingCategory').option}
          series={renderChart('personalTrainingCategory').series}
          type="donut"
        />
        <div className="w-full">
          {generateData('personalTrainingCategory').map((it, index) => (
            <div key={index} className="grid grid-cols-2 my-1">
              <p className="text-right pr-2">{it.data}%</p>
              <p style={{ color: it.color }} className="text-[14px] pl-2">
                {it.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-8">
        <p className="font-bold text-[17px]">Type</p>
        <Chart
          height={120}
          options={renderChart('trainingType').option}
          series={renderChart('trainingType').series}
          type="donut"
        />
        <div className="w-full">
          {generateData('trainingType').map((it) => (
            <div className="grid grid-cols-2 my-1">
              <p className="text-right pr-2">{it.data}%</p>
              <p style={{ color: it.color }} className="text-[14px] pl-2">
                {it.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
