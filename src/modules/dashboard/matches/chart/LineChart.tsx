import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Chart, Loading } from 'src/components'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { MatchesTrainingType } from 'src/constants/types/dashboard/matches.types'
import { lineChartOptions } from 'src/hooks/functionCommon'
import { fetchMatches } from 'src/service/dashboard/matches.service'

type LineChartProps = {
  range: string
  filter?: MatchesTrainingType | string
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

  const chartSeries = data.series.filter((item) =>
    selectedSeries.includes(item.name)
  )

  useEffect(() => {
    if (responseMatchesChart) {
      setData((prev) => ({
        ...prev,
        xaxis: {
          ...prev.xaxis,
          dataPoints: responseMatchesChart?.data.personalMatchChart?.map(
            (it) => it.day
          ),
        },
        series: [
          {
            color: '#4654EA',
            data: responseMatchesChart?.data.personalMatchChart.map(
              (it) => it.value
            ),
            name: 'You',
          },
          {
            color: '#A2A5AD',
            data: responseMatchesChart?.data.averageMatchChart.map(
              (it) => it.value
            ),
            name: 'Average',
          },
        ],
      }))
    }
  }, [JSON.stringify(responseMatchesChart)])

  const chartOptions: ApexOptions = useMemo(() => {
    return lineChartOptions(chartSeries, theme) as ApexOptions
  }, [JSON.stringify(data)])

  return (
    <div className="bg-defaultBackGround flex flex-col items-center justify-center col-span-7 laptopM:p-9 mobileM:py-4 rounded-lg">
      <Loading isLoading={isGettingMatchesChart} className="pt-4 w-full">
        <div className="w-full">
          <Chart
            height={380}
            options={chartOptions}
            series={chartSeries}
            type="line"
          />
        </div>
      </Loading>
    </div>
  )
}
