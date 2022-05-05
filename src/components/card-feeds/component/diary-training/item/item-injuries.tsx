import { useTheme } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import { Chart } from 'src/components/chart'
import { BODY_PART } from 'src/constants/types/diary.types'
import { CardFeedType } from 'src/constants/types/feed/yours'
import { InjurySpot } from 'src/modules/update-diary/player/components/InjurySpot'

interface LineChartProps {
  dataChart: number[]
}

const LineChart = ({ dataChart }: LineChartProps) => {
  const theme = useTheme()
  const [data, setData] = useState(dataChart)

  const chartSeries = [{ data: data }]

  useEffect(() => {
    if (data.length === 1) {
      setData([0, ...data])
    }
  }, [])

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ['#2F3EB1'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      show: false,
    },
    stroke: {
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

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      width={292}
      height={68}
    />
  )
}

interface ItemInjuriesProps {
  card: CardFeedType
}

export const ItemInjuries = ({ card }: ItemInjuriesProps) => {
  const getPositon = (position: string): string => {
    let res = position.charAt(0)
    for (let i = 1; i < position.length; i++) {
      if (position[i] === '-') {
        res += position[i + 1]
      }
    }

    return res
  }

  return (
    <div className="w-full relative grid grid-cols-3">
      <div className="col-span-1">
        {card?.injuries[0]?.isFront ? (
          <div
            className="mx-auto bg-front-body relative w-[214px] h-[440px] bg-no-repeat 
            bg-center cursor-pointer duration-150 scale-50 -top-[108px]"
          >
            {card?.injuries &&
              card?.injuries.map((item) => {
                const keyPositon: string = getPositon(item.injuryArea)
                const result = Object.keys(BODY_PART).findIndex(
                  (item) => item === keyPositon
                )

                let res = null
                if (keyPositon.charAt(0) === 'F') {
                  res = (
                    <div className="absolute top-0 left-0">
                      <InjurySpot
                        level={item.value * 20}
                        spot={Object.values(BODY_PART)[result].spot}
                        showLevel
                      />
                    </div>
                  )
                }

                return <>{res}</>
              })}
          </div>
        ) : (
          <div
            className="bg-back-body relative w-[214px] h-[440px] mx-auto 
            bg-no-repeat bg-center cursor-pointer duration-150 scale-50 -top-[108px]"
          >
            {card?.injuries &&
              card?.injuries.map((item) => {
                const keyPositon: string = getPositon(item.injuryArea)
                const result = Object.keys(BODY_PART).findIndex(
                  (item) => item === keyPositon
                )

                let res = null
                if (keyPositon.charAt(0) === 'B') {
                  res = (
                    <div className="absolute top-0 left-0">
                      <InjurySpot
                        level={item.value * 20}
                        spot={Object.values(BODY_PART)[result].spot}
                        showLevel
                      />
                    </div>
                  )
                }

                return <>{res}</>
              })}
          </div>
        )}
      </div>

      <div className="col-span-2">
        <p className="text-[14px] font-bold ml-[24px]">Pain trend</p>

        <div className="ml-[12px]">
          <LineChart dataChart={card?.injuriesTrending} />
        </div>

        <p className="text-[14px] ml-[24px]">
          {card?.injuries[0]?.description}
        </p>
        <div className="flex mt-[8px] ml-[24px]">
          {card?.injuryTags.map((tag) => (
            <div className="bg-[#4654EA] rounded-[8px] h-[30px] w-[66px] truncate mr-[8px]">
              <span className="p-[10px]">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
