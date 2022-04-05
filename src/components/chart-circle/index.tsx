import type { ApexOptions } from 'apexcharts'
import { Chart } from '../chart'
import { isMobile, isTablet, isDesktop } from 'react-device-detect'
import clsx from 'clsx'

interface ChartCircleProps {
  chart?: any
  index?: number
  ArrayColor?: any
  ArrayLabel?: any
  ArrayPercent?: any
  type?: string
}

export const ChartCircle = ({
  chart,
  index,
  ArrayLabel,
  ArrayColor,
  ArrayPercent,
  type,
}: ChartCircleProps) => {
  const chartOptions: ApexOptions = {
    chart: {
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
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
  }

  const chartSeries = ArrayPercent[index]

  return (
    <div>
      <div
        className={`${type === 'training' && 'h-[48px] md:h-[24px] ml-[12px]'}`}
      >
        {index === 0 && type === 'training' && (
          <p className="font-bold text-[16px] text-left">Training category</p>
        )}
        {index === 1 && type === 'training' && (
          <p className="font-bold text-[16px] text-left">Match results</p>
        )}
        {index === 2 && type === 'training' && (
          <p className="font-bold text-[16px] text-left">Day usage</p>
        )}
      </div>
      <div
        className={`mt-[24px] mb-[24px] mx-auto ${clsx(
          type === 'training' && 'ml-[-12px]'
        )} w-[86px] md:w-[72px] lg:w-[96px] xl:w-[120px]`}
      >
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          // width={isMobile ? 96 : 100}
        />
      </div>
      <div className="ml-[12px]">
        {type !== 'wellness' &&
          ArrayLabel &&
          ArrayLabel[index].map(
            (label, index2) =>
              ArrayPercent &&
              ArrayPercent[index].map((percent, index3) => {
                if (index2 === index3) {
                  return (
                    <div className="w-full float-left mb-[4px]">
                      <div className="w-1/5 md:w-1/4 float-left text-[8px] md:text-[14px] mt-[4px] md:mt-[0px]">
                        {percent}%
                      </div>
                      <div
                        style={{ color: `${ArrayColor[index][index2]}` }}
                        className="w-4/5 md:w-3/4 ml-[8px] md:ml-[0px] text-[12px] md:text-[14px]"
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
