import { Chart } from 'src/components/chart'
import { FC, useState } from 'react'
import type { ApexOptions } from 'apexcharts'
import { alpha, useTheme } from '@mui/material/styles'
import { DataAnalytic } from 'src/constants/types'
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
const cls = require('../../overview.module.css')

interface AnalyticsProps {}

const arrayAnalytics = [
  {
    title: 'Visits',
    total: 2131,
    percent: 2.2,
    icon: null,
    data: [0, 60, 30, 60, 0, 30, 10, 30, 0],
    color: '#E85CFF',
  },
  {
    title: 'Visitors',
    total: 213,
    percent: 2.2,
    icon: null,
    data: [0, 60, 30, 60, 0, 30, 10, 30, 0],
    color: '#4654EA',
  },
  {
    title: 'Fans',
    total: 1131,
    percent: 5.2,
    icon: null,
    data: [0, 60, 30, 60, 0, 30, 10, 30, 0],
    color: '#07E1FF',
  },
  {
    title: 'Friends',
    total: 131,
    percent: 0.2,
    icon: null,
    data: [0, 60, 30, 60, 0, 30, 10, 30, 0],
    color: '#09E099',
  },
]

const arrayIcon = [
  {
    id: '0',
    icon: <SvgEye />,
    className: 'bg-[#E85CFF]',
  },
  {
    id: '1',
    icon: <SvgVisitor />,
    className: 'bg-[#4654EA]',
  },
  {
    id: '2',
    icon: <SvgFan />,
    className: 'bg-[#07E1FF]',
  },
  {
    id: '3',
    icon: <SvgAddFriend />,
    className: 'bg-[#09E099]',
  },
]

const LineChart = ({ color }: { color?: string }) => {
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

  const chartSeries = [{ data: [90, 60, 30, 60, 93, 30, 20, 100, 50] }]

  return (
    <div className="">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        // width={262}
        height={70}
      />
    </div>
  )
}

export const Analytics = () => {
  const [dataAnalytics, setDataAnalytics] =
    useState<DataAnalytic[]>(arrayAnalytics)

  return (
    <div className="w-full">
      <Grid container spacing={4}>
        {dataAnalytics.map((item, index) => (
          <Grid item md={3} sm={6} xs={12} key={index}>
            <Card className={`${cls.item} p-[16px]`}>
              <div className="w-full float-left max-h-[146px]">
                {arrayIcon.map((item2, index2) => {
                  if (index === index2) {
                    return (
                      <div
                        className={`${item2.className} w-[24px] h-[24px] relative rounded-full flex items-center float-left`}
                      >
                        <div className="absolute left-[6px]">{item2.icon}</div>
                      </div>
                    )
                  } else {
                    return
                  }
                })}
                <p className="text-[16px] ml-[38px]">{item.title}</p>
              </div>

              <div className="w-full float-left h-[70px]">
                <LineChart color={item.color} />
              </div>

              <div className="flex justify-between w-full items-center">
                <span className="text-[24px] font-bold">{item.total}</span>
                <span
                  className={`order-last text-[12px] ${
                    item.total > 1000 ? 'text-[#09E099]' : 'text-[#D60C0C]'
                  }`}
                >
                  {item.total > 1000 ? (
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
                      -
                    </div>
                  )}
                  {item.percent}%
                </span>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
