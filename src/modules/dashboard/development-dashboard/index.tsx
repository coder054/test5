import { useEffect, useState } from 'react'
import { PeriodFilter } from '../components/PeriodFilter'
import { alpha, useTheme } from '@mui/material/styles'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { useQuery } from 'react-query'
import { getDashboardWellness } from 'src/service/dashboard/dashboard-overview'
import { ApexOptions } from 'apexcharts'
import { ButtonAddPopup, Chart, Loading } from 'src/components'
import { DetailChart } from '../overview/component/wellness/DetailChart'
import { getHealthChart } from 'src/service/dashboard/health.service'
import { HealthChartOption } from '../constants-dashboard'
import { getDevelopmentTalkChart } from 'src/service/dashboard/development.service'
import { ListGoal } from './component/list-goal'
import SimpleBar from 'simplebar-react'
import { ListDevelopment } from './component/list-development'
const cls = require('../overview/overview.module.css')

export const Development = () => {
  const theme = useTheme()
  const [range, setRange] = useState<string>('180')
  const [selectedSeries, setSelectedSeries] = useState(['You', 'Average'])

  const [arrayYou, setArrayYou] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])
  const [arrayAvg, setArrayAvg] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])
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

  const { isLoading: loading, data: dataHealthChart } = useQuery(
    [QUERIES_DASHBOARD.DEVELOPMENT_DATA, range],
    () => getDevelopmentTalkChart(range),
    {
      onSuccess: (res) => {
        if (res) {
          setArrayAvg([])
          setArrayYou([])

          res.data.coachDevTalkRoutine.developmentProgressChart.forEach(
            (element) => {
              setArrayAvg((prev) => [...prev, element.value])
            }
          )
          res.data.personalDevTalkRoutine.developmentProgressChart.forEach(
            (element) => {
              setArrayYou((prev) => [...prev, element.value])
            }
          )
        }
      },
    }
  )

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
    <div className="grid grid-cols-12 space-y-7">
      <div className="w-full flex flex-row-reverse col-span-12">
        <PeriodFilter
          value={range}
          onChange={setRange}
          label="Filter development"
          className="pb-6"
        />
      </div>

      <div
        className={`${cls.item} col-span-12 lg:col-span-7 h-[500px] p-[16px] md:p-[32px]`}
      >
        <div className="text-center text-[#A2A5AD]">
          <p className="text-[#09E099] text-[18px]">Your Development Trend</p>
          <p>
            <span className="text-[#09E099]">
              To get best possible support,
            </span>
            <span className="text-[#A2A5AD]">
              {' '}
              run frequent development talks with your Coaches!
            </span>
          </p>
        </div>
        <Loading isLoading={loading}>
          <div className="w-full h-[400px] relative">
            <p className="text-[#A2A5AD] text-[12px] absolute top-[24px]">20</p>
            <div
              className={`${cls.borderLine} absolute w-full top-[186px]`}
            ></div>
            <div className="w-full -ml-[18px]">
              <Chart
                height={400}
                options={chartOptions}
                series={chartSeries}
                type="line"
              />
            </div>
            <p className="text-[#A2A5AD] text-[12px] mb-[4px] absolute bottom-[16px]">
              0
            </p>
          </div>
        </Loading>
      </div>

      <div
        className={` col-span-12 lg:col-span-5 lg:ml-[20px] p-[16px] md:p-[32px] ${cls.item}`}
      >
        <Loading isLoading={loading}>
          <DetailChart
            health
            loading={loading}
            dataYou={
              dataHealthChart?.data?.personalDevTalkRoutine?.devProgressPercent
            }
            dataAvg={
              dataHealthChart?.data?.coachDevTalkRoutine?.devProgressPercent
            }
          />
        </Loading>
      </div>

      <div className={` col-span-12 lg:col-span-5 ${cls.item}`}>
        <p className="pt-[32px] pl-[32px]">Goal updates</p>
        <SimpleBar style={{ maxHeight: 410 }}>
          <div className="pl-[16px] md:pl-[32px] pb-[16px] md:pb-[32px] pr-[16px] md:pr-[32px]">
            <ListGoal />
          </div>
        </SimpleBar>
      </div>

      <div
        className={` col-span-12 lg:col-span-7 ml-[20px] ${cls.item} max-h-[523px]`}
      >
        <p className="pt-[32px] pl-[32px]">Development updates</p>
        <div className="mt-[24px] pl-[16px] md:pl-[32px] pb-[16px] md:pb-[32px] pr-[16px] md:pr-[32px]">
          <ListDevelopment />
        </div>
      </div>

      <ButtonAddPopup />
    </div>
  )
}
