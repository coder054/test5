import { Chart } from 'src/components/chart'
import { FC, useEffect, useState } from 'react'
import type { ApexOptions } from 'apexcharts'
import { alpha, useTheme } from '@mui/material/styles'
import { AnalyticsType, DataAnalytic } from 'src/constants/types'
import { Box, Card, Grid, Typography } from '@mui/material'
import {
  SvgAddFriend,
  SvgDeincrement,
  SvgEye,
  SvgFan,
  SvgFavorite,
  SvgIncrement,
  SvgVisitor,
} from 'src/imports/svgs'
import { Loading } from '../MyLoading'

interface LineChartProps {
  data?: number[]
  color?: string
}

const LineChart = ({ color, data }: LineChartProps) => {
  const theme = useTheme()

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      width: '100%',
    },
    colors: [`${color}`],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      gradient: {
        shade: 'light',
      },
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  }

  const chartSeries = [{ data: data }]

  return (
    <div className="">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={70}
      />
    </div>
  )
}

interface AnalyticItemProps {
  loading?: boolean
  title?: string
  color?: string
  backgroundColor?: string
  icon?: any
  index?: number
  data?: AnalyticsType
  lastDateRange?: string
}

export const AnalyticItem = ({
  loading,
  title,
  color,
  icon,
  backgroundColor,
  data,
  index,
  lastDateRange,
}: AnalyticItemProps) => {
  const [dataChart, setDataChart] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    if (data) {
      setDataChart([])
      data.chart.forEach((element) => {
        setDataChart((prev) => [...prev, element.value])
      })
    }
  }, [data])

  return (
    <Loading isLoading={loading}>
      <Grid className="w-full">
        <Card className={`p-[16px]`}>
          <div className="w-full float-left max-h-[146px]">
            <div
              className={`${backgroundColor} w-[24px] h-[24px] relative rounded-full flex items-center float-left`}
            >
              <div className="absolute left-[6px]">{icon}</div>
            </div>
            <p className="text-[16px] ml-[38px]">{title}</p>
          </div>

          <div className="w-full float-left h-[70px]">
            <LineChart color={color} data={dataChart && dataChart} />
          </div>

          <div className="flex justify-between w-full items-center">
            <span className="text-[24px] font-bold">{data?.count}</span>
            <span
              className={`order-last text-[12px] ${
                data?.count > 0 ? 'text-[#09E099]' : 'text-[#D60C0C]'
              }`}
            >
              {data?.percentChanged > 0 ? (
                <div className="float-left">
                  <div className="float-left mr-[5.25px] mt-[5px]">
                    <SvgIncrement />
                  </div>
                  +
                </div>
              ) : (
                <div className="float-left">
                  <div className="float-left mr-[5.25px] mt-[5px]">
                    <SvgDeincrement />
                  </div>
                </div>
              )}
              {data?.percentChanged}%
            </span>
          </div>
        </Card>
      </Grid>
    </Loading>
  )
}
