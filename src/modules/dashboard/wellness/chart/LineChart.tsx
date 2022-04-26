import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Chart, Loading } from 'src/components'
import { lineChartOptions } from 'src/hooks/functionCommon'

type LineChartInputType = {
  series: { color: string; data: number[]; name: string }[]
  xaxis: { dataPoints: string[] }
}

type LineChartProps = {
  response: any
  isLoading: boolean
}

export const LineChart = ({ response, isLoading }: LineChartProps) => {
  const [selectedSeries, setSelectedSeries] = useState(['You', 'Average'])
  const [data, setData] = useState<LineChartInputType>({
    series: [
      {
        color: '#4654EA',
        data: [],
        name: 'You',
      },
      {
        color: '#A2A5AD',
        data: [],
        name: 'Average',
      },
    ],
    xaxis: {
      dataPoints: [],
    },
  })

  const chartSeries = data.series.filter((item) =>
    selectedSeries.includes(item.name)
  )

  useEffect(() => {
    if (response) {
      setData((prev) => ({
        ...prev,
        xaxis: {
          ...prev.xaxis,
          dataPoints: response?.data.personalDiaryRoutineChart?.map(
            (it) => it.day
          ),
        },
        series: [
          {
            color: '#4654EA',
            data: response?.data.personalDiaryRoutineChart.map(
              (it) => it.value
            ),
            name: 'You',
          },
          {
            color: '#A2A5AD',
            data: response?.data.averageDiaryRoutineChart.map((it) => it.value),
            name: 'Average',
          },
        ],
      }))
    }
  }, [JSON.stringify(response)])

  const chartOptions: ApexOptions = useMemo(() => {
    const theme = useTheme()
    return lineChartOptions(chartSeries, theme) as ApexOptions
  }, [JSON.stringify(data)])

  return (
    <div className="bg-defaultBackGround flex flex-col items-center justify-center col-span-7 laptopM:p-9 mobileM:py-4 rounded-lg">
      <Loading isLoading={isLoading} className="pt-4 w-full">
        <Chart
          height={380}
          options={chartOptions}
          series={chartSeries}
          type="line"
        />
      </Loading>
    </div>
  )
}
