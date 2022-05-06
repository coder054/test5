import { CardFeedType } from 'src/constants/types/feed/yours'
import { Chart, Loading } from 'src/components'
import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import { useTheme } from '@mui/material/styles'

interface ItemLineChartProps {
  card: CardFeedType
  loading?: boolean
}

export const ItemLineChart = ({ card, loading }: ItemLineChartProps) => {
  const [selectedSeries, setSelectedSeries] = useState([
    'Energy',
    'Sleep',
    'Eat',
  ])
  const [arrayEnergy, setArrayEnergy] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ])
  const [arraySleep, setArraySleep] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ])
  const [arrayEat, setArrayEat] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ])
  const [dataChart, setDataChart] = useState({
    series: [
      {
        color: '#09E099',
        data: [0, 0, 0, 0, 0, 0, 0],
        name: 'Energy',
      },
      {
        color: '#4654EA',
        data: [0, 0, 0, 0, 0, 0, 0],
        name: 'Sleep',
      },
      {
        color: '#E85CFF',
        data: [0, 0, 0, 0, 0, 0, 0],
        name: 'Eat',
      },
    ],
  })

  const theme = useTheme()
  const chartSeries = dataChart.series.filter((item) =>
    selectedSeries.includes(item.name)
  )

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: chartSeries.map((item) => item.color),

    fill: {
      opacity: 1,
    },
    legend: {
      show: true,
    },
    markers: {
      radius: 2,
      shape: 'circle',
      size: 4,
      strokeWidth: 0,
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  }
  useEffect(() => {
    setArrayEnergy([])
    setArraySleep([])
    setArrayEat([])
    card?.energyChart.forEach((element) => {
      setArrayEnergy((prev) => [...prev, element])
    })
    card?.sleepChart.forEach((element) => {
      setArraySleep((prev) => [...prev, element])
    })
    card?.eatChart.forEach((element) => {
      setArrayEat((prev) => [...prev, element])
    })
  }, [card?.energyChart, card?.sleepChart, card?.eatChart])

  useEffect(() => {
    setDataChart({
      series: [
        {
          color: '#09E099',
          data: arrayEnergy,
          name: 'Energy',
        },
        {
          color: '#4654EA',
          data: arraySleep,
          name: 'Sleep',
        },
        {
          color: '#E85CFF',
          data: arrayEat,
          name: 'Eat',
        },
      ],
    })
  }, [arrayEnergy, arraySleep, arrayEat])

  return (
    <Loading isLoading={loading}>
      <div className="w-full h-[400px] relative">
        <p className="text-[#A2A5AD] text-[12px] absolute top-[4px]">
          Very good
        </p>
        <div className="w-full -ml-[18px] pointer-events-none">
          <Chart
            height={195}
            options={chartOptions}
            series={chartSeries}
            type="line"
          />
        </div>
        <p className="text-[#A2A5AD] text-[12px] absolute top-[196px]">
          Very bad
        </p>
      </div>
    </Loading>
  )
}
