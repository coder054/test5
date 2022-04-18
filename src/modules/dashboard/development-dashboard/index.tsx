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
const cls = require('../overview/overview.module.css')

export const Development = () => {
  const theme = useTheme()
  const [range, setRange] = useState<string>('30')
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

      <div className={`${cls.item} col-span-7 h-[460px] p-[16px] md:p-[32px]`}>
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

      <div className={`col-span-5 ml-[20px] p-[16px] md:p-[32px] ${cls.item}`}>
        <Loading isLoading={loading}>
          <DetailChart
            health
            loading={loading}
            dataYou={dataHealthChart?.data?.personalDiaryRoutinePieChart}
            dataAvg={dataHealthChart?.data?.averageDiaryRoutinePieChart}
          />
        </Loading>
      </div>

      <div className={`col-span-5 ${cls.item}`}>
        <SimpleBar style={{ maxHeight: 450 }}>
          <div className=" p-[16px] md:p-[32px]">
            <p>Goal updates</p>
            <ListGoal />
          </div>
        </SimpleBar>
      </div>

      <div className={`col-span-7 ml-[20px] p-[16px] md:p-[32px] ${cls.item}`}>
        <p>Development updates</p>
      </div>

      <ButtonAddPopup />
    </div>
  )
}
