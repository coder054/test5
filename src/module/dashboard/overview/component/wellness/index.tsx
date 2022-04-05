const cls = require('../../overview.module.css')
import { Chart, TooltipCustom } from 'src/components'
import { alpha, useTheme } from '@mui/material/styles'
import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'
import { ApexOptions } from 'apexcharts'
import { useState } from 'react'
import { Tooltip } from '@mui/material'
import { DetailChart } from './DetailChart'

const data = {
  series: [
    {
      color: '#A2A5AD',
      data: [35, 42, 62, 223, 103, 180, 29],
      name: 'Average',
    },
    {
      color: '#4654EA',
      data: [100, 122, 50, 200, 250, 100, 150],
      name: 'You',
    },
  ],
}

export const Wellness = () => {
  const theme = useTheme()

  const [selectedSeries, setSelectedSeries] = useState(['You', 'Average'])

  const chartSeries = data.series.filter((item) =>
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

  return (
    <div
      className={`${cls.item} w-full pt-[16px] md:pt-[32px] pl-[16px] md:pl-[32px] pr-[16px] md:pr-[35px] pb-[16px] md:pb-[38px]`}
    >
      <div className="flex justify-between">
        <p className="text-[16px] text-[#ffffff] font-bold">Wellness</p>
        <div className="order-list">
          <TooltipCustom
            title="This is total leaderboard tooltip description"
            placement="top-end"
          >
            <div className="order-list cursor-pointer">
              <SvgInfomation />
            </div>
          </TooltipCustom>
        </div>
      </div>

      <div className="w-full h-[400px] relative">
        <p className="text-[#A2A5AD] text-[12px] absolute top-[24px]">
          Very good
        </p>
        <div className={`${cls.borderLine} absolute w-full top-[200px]`}></div>
        <div className="w-full -ml-[18px]">
          <Chart
            height={400}
            options={chartOptions}
            series={chartSeries}
            type="line"
          />
        </div>
        <p className="text-[#A2A5AD] text-[12px] mb-[4px] absolute bottom-[16px]">
          Very bad
        </p>
      </div>

      <DetailChart />

      <div className="flex items-center mt-[50px] cursor-pointer">
        <p className="text-[12px] text-[#09E099] mr-[11px]">See all update</p>
        <SvgAllowRight />
      </div>
    </div>
  )
}
