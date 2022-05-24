import React from 'react'
import { Chart } from 'src/components'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'

interface DonutChartProps {
  value: { key: string; value: number }[]
}

export default function DonutChart({ value }: DonutChartProps) {
  const theme = useTheme()

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: ['#E85CFF', '#4654EA', '#07E1FF', '#09E099'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    labels: value.map((it) => it.key),
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
  }

  const chartSeries = value.map((it) => it.value)

  return (
    <Chart
      height={90}
      width={100}
      options={chartOptions}
      series={chartSeries}
      type="donut"
    />
  )
}
