import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Typography,
} from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import type { ApexOptions } from 'apexcharts'
import { useState } from 'react'
import { Chart } from '../chart'

interface ChartCircleProps {
  chart?: any
  index?: number
  ArrayColor?: any
  ArrayLabel?: any
  ArrayPercent?: any
}

export const ChartCircle = ({
  chart,
  index,
  ArrayLabel,
  ArrayColor,
  ArrayPercent,
}: ChartCircleProps) => {
  const theme = useTheme()

  const chartOptions: ApexOptions = {
    chart: {
      height: '300px',
      width: '300px',
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: ArrayColor[index],
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
    labels: ArrayLabel[index],
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false,
        },
        hollow: {
          size: '30%',
        },
        track: {
          background: theme.palette.secondary.dark,
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  }

  const chartSeries = ArrayPercent[index]

  return (
    <div className="">
      {index === 0 && (
        <p className="font-bold text-[16px] text-center">Training category</p>
      )}
      {index === 1 && (
        <p className="font-bold text-[16px] text-center">Match results</p>
      )}
      {index === 2 && (
        <p className="font-bold text-[16px] text-center">Day usage</p>
      )}
      <div className="mt-[24px] mb-[24px] mx-auto">
        <Chart
          height={386}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width={186}
        />
      </div>
      <div>
        {ArrayLabel &&
          ArrayLabel[index].map(
            (label, index2) =>
              ArrayPercent &&
              ArrayPercent[index].map((percent, index3) => {
                if (index2 === index3) {
                  return (
                    <div className="w-full float-left text-[14px] mb-[4px]">
                      <div className="w-1/4 float-left">{percent}%</div>
                      <div
                        style={{ color: `${ArrayColor[index][index2]}` }}
                        className="w-3/4"
                      >
                        {label}
                      </div>
                    </div>
                  )
                }
              })
          )}
      </div>
    </div>
  )
}
