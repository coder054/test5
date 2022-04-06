import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Chart, Loading } from 'src/components'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { fetchMatches } from 'src/service/dashboard-matches'
import { MatchesTrainingType } from 'src/constants/types/dashboard/matches.types'

type LineChartProps = {
  range: string
  filter?: MatchesTrainingType
}

type LineChartInputType = {
  series: { color: string; data: number[]; name: string }[]
  xaxis: { dataPoints: string[] }
}

export const LineChart = ({ range, filter }: LineChartProps) => {
  const theme = useTheme()

  const { isLoading: isGettingMatchesChart, data: responseMatchesChart } =
    useQuery([QUERIES_DASHBOARD.MATCHES_CHART, range, filter], () =>
      fetchMatches({ range: range, type: filter })
    )

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
    if (responseMatchesChart) {
      const days = responseMatchesChart?.data.personalMatchChart?.map(
        (it) => it.day
      )
      const personal = responseMatchesChart?.data.personalMatchChart.map(
        (it) => it.value
      )
      const average = responseMatchesChart?.data.averageMatchChart.map(
        (it) => it.value
      )
      setData((prev) => ({
        ...prev,
        xaxis: { ...prev.xaxis, dataPoints: days },
        series: [
          { color: '#4654EA', data: personal, name: 'You' },
          { color: '#A2A5AD', data: average, name: 'Average' },
        ],
      }))
    }
  }, [JSON.stringify(responseMatchesChart)])

  const chartOptions: ApexOptions = useMemo(() => {
    return {
      chart: {
        background: 'transparent',
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      colors: chartSeries.map((item) => item.color),
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      grid: {
        borderColor: theme.palette.divider,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        show: false,
      },
      markers: {
        hover: {
          size: undefined,
          sizeOffset: 2,
        },
        radius: 2,
        shape: 'circle',
        size: 4,
        strokeWidth: 0,
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
        width: 3,
      },
      theme: {
        mode: theme.palette.mode,
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider,
        },
        axisTicks: {
          color: theme.palette.divider,
          show: true,
        },
        categories: data.xaxis.dataPoints,
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
      yaxis: [
        {
          axisBorder: {
            color: theme.palette.divider,
            show: true,
          },
          axisTicks: {
            color: theme.palette.divider,
            show: true,
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary,
            },
          },
        },
        {
          axisTicks: {
            color: theme.palette.divider,
            show: true,
          },
          axisBorder: {
            color: theme.palette.divider,
            show: true,
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary,
            },
          },
          opposite: true,
        },
      ],
    }
  }, [JSON.stringify(data)])

  return (
    <div className="bg-defaultBackGround flex flex-col items-center justify-center col-span-7 p-9 rounded-lg">
      <Loading isLoading={isGettingMatchesChart} className="pt-4">
        <Chart
          width={900}
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
