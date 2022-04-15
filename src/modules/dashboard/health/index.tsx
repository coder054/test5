import { useEffect, useState } from 'react'
import { PeriodFilter } from '../components/PeriodFilter'
import { alpha, useTheme } from '@mui/material/styles'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { useQuery } from 'react-query'
import { getDashboardWellness } from 'src/service/dashboard/dashboard-overview'
import { ApexOptions } from 'apexcharts'
import { ButtonAddPopup, Chart, Loading } from 'src/components'
import { DetailChart } from '../overview/component/wellness/DetailChart'
import { HealthUpdates } from './component/HealthUpdates'
import { getHealthChart } from 'src/service/dashboard/health.service'
import { MySelect } from 'src/components/MySelect'
import { HealthChartOption } from '../constants-dashboard'
const cls = require('../overview/overview.module.css')

export const Health = () => {
  const theme = useTheme()
  const [range, setRange] = useState<string>('1')
  const [healthChartType, setHealthChartType] = useState<string>('BMI')
  const [healthType, setHealthType] = useState<string>('BMI')
  const [selectedSeries, setSelectedSeries] = useState(['You', 'Average'])
  const [checkFilter, setCheckFilter] = useState<boolean>(false)

  const [arrayYou, setArrayYou] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ])
  const [arrayAvg, setArrayAvg] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ])
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
    [QUERIES_DASHBOARD.HEALTH_DATA, range, healthChartType],
    () => getHealthChart(range, healthChartType),
    {
      onSuccess: (res) => {
        if (res) {
          setArrayAvg([])
          setArrayYou([])
          res.averageHealthChart.healthLineChart.forEach((element) => {
            setArrayAvg((prev) => [...prev, element.value])
          })
          res.personalHealthChart.healthLineChart.forEach((element) => {
            setArrayYou((prev) => [...prev, element.value])
          })
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

  useEffect(() => {
    checkFilter &&
      HealthChartOption.map((item) => {
        if (item.value === healthChartType) {
          setHealthType(item.label)
        }
      })
  }, [healthChartType, checkFilter])

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
          label="Filter health"
          health
          healthType={healthType}
          setHealthChartType={setHealthChartType}
          optionLabel="Health chart data"
          className="pb-6"
          option={healthChartType}
          optionChange={setHealthChartType}
          options={HealthChartOption}
          setCheckFilter={setCheckFilter}
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
            dataYou={{ bad: 0, good: 2, normal: 84, veryBad: 6, veryGood: 8 }}
            dataAvg={{ bad: 0, good: 2, normal: 84, veryBad: 6, veryGood: 8 }}
            // dataYou={dataHealthChart?.personalDiaryRoutinePieChart}
            // dataAvg={dataHealthChart?.averageDiaryRoutinePieChart}
          />
        </Loading>
      </div>

      <div
        className={`${cls.item} col-span-12 p-[16px] md:p-[32px] mb-[108px]`}
      >
        <HealthUpdates />
      </div>

      <ButtonAddPopup />
    </div>
  )
}
