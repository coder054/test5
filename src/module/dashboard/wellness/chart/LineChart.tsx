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

  const handleChange = useCallback(
    (name: string): void => {
      if (selectedSeries.includes(name)) {
        setSelectedSeries(selectedSeries.filter((it) => it !== name))
      } else setSelectedSeries([...selectedSeries, name])
    },
    [JSON.stringify(selectedSeries)]
  )

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
    return lineChartOptions(chartSeries, data, theme) as ApexOptions
  }, [JSON.stringify(data)])

  return (
    <div className="bg-defaultBackGround flex flex-col items-center justify-center col-span-7 p-9 rounded-lg">
      <Loading isLoading={isLoading} className="pt-4 w-full">
        <Chart
          height={380}
          options={chartOptions}
          series={chartSeries}
          type="line"
        />
      </Loading>
      <div className="flex justify-center space-x-8">
        {data.series.map((it) => (
          <button
            key={it.name}
            style={{ color: it.color }}
            onClick={() => handleChange(it.name)}
            className={clsx(
              'flex items-center space-x-2',
              !selectedSeries.some((visible) => visible === it.name) &&
                'opacity-50'
            )}
          >
            <span
              style={{ backgroundColor: it.color }}
              className="w-3 h-3 rounded-full block"
            ></span>
            <p>{it.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
