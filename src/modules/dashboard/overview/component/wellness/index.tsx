const cls = require('../../overview.module.css')
import { Chart, TooltipCustom } from 'src/components'
import { alpha, useTheme } from '@mui/material/styles'
import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import { DetailChart } from './DetailChart'
import { useQuery } from 'react-query'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { getDashboardWellness } from 'src/service/dashboard/dashboard-overview'
import { MatchesTable } from 'src/modules/dashboard/matches/table'
import { WellnessType } from 'src/constants/types'

interface WellnessProps {
  lastDateRange?: string
  setLastDateRange?: (lastDate?: string) => void
  setCurrentTab?: (tab?: string) => void
}

export const Wellness = ({ lastDateRange, setCurrentTab }: WellnessProps) => {
  const theme = useTheme()
  const [selectedSeries, setSelectedSeries] = useState(['You', 'Average'])
  const [arrayYou, setArrayYou] = useState<number[]>([])
  const [arrayAvg, setArrayAvg] = useState<number[]>([])
  const [dataChart, setDataChart] = useState({
    series: [
      {
        color: '#A2A5AD',
        data: [0, 0, 0, 0, 0, 0, 0],
        name: 'Average',
      },
      {
        color: '#4654EA',
        data: [0, 0, 0, 0, 0, 0, 0],
        name: 'You',
      },
    ],
  })
  const [dataWellnesss, setDataWellnesss] = useState<WellnessType>({
    personalDiaryRoutineChart: [
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
    ],
    averageDiaryRoutineChart: [
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
      {
        index: 0,
        value: 0,
        day: '',
      },
    ],
    personalDiaryRoutinePieChart: {
      veryBad: 0,
      bad: 0,
      normal: 0,
      good: 0,
      veryGood: 0,
    },
    averageDiaryRoutinePieChart: {
      veryBad: 0,
      bad: 0,
      normal: 0,
      good: 0,
      veryGood: 0,
    },
  })
  const [diaryRoutine, setDiaryRoutine] = useState<string>('energyLevel')
  const { isLoading: loading, data: dataWellness } = useQuery(
    [QUERIES_DASHBOARD.WELLNESS_DATA, lastDateRange, diaryRoutine],
    () => getDashboardWellness(lastDateRange, diaryRoutine)
  )

  useEffect(() => {
    setArrayYou([])
    setArrayAvg([])
    dataWellness &&
      dataWellness.personalDiaryRoutineChart.forEach((element) => {
        setArrayYou((prev) => [...prev, element.value])
      })

    dataWellness &&
      dataWellness.averageDiaryRoutineChart.forEach((element) => {
        setArrayAvg((prev) => [...prev, element.value])
      })
  }, [dataWellness])

  useEffect(() => {
    setDataChart({
      series: [
        {
          color: '#A2A5AD',
          data: arrayAvg,
          name: 'Average',
        },
        {
          color: '#4654EA',
          data: arrayYou,
          name: 'You',
        },
      ],
    })
  }, [arrayAvg, arrayYou])

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
        <div className={`${cls.borderLine} absolute w-full top-[186px]`}></div>
        <div className="w-full -ml-[18px] absolute top-[24px]">
          <Chart
            height={400}
            options={chartOptions}
            series={chartSeries}
            type="line"
          />
        </div>
        <p className="text-[#A2A5AD] text-[12px] mb-[4px] absolute bottom-[-8px]">
          Very bad
        </p>
      </div>

      <DetailChart
        loading={loading}
        dataYou={dataWellness?.personalDiaryRoutinePieChart}
        dataAvg={dataWellness?.averageDiaryRoutinePieChart}
      />
      <div
        className="flex items-center mt-[50px] cursor-pointer w-[126px]"
        onClick={() => {
          setCurrentTab && setCurrentTab('wellness')
        }}
      >
        <p className="text-[12px] text-[#09E099] mr-[11px]">See all updates</p>
        <SvgAllowRight />
      </div>
    </div>
  )
}
