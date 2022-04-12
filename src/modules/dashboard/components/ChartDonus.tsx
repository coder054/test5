import type { ApexOptions } from 'apexcharts'
import { Chart } from 'src/components'

type ChartDonusProps = {
  value: { color: string; label: string; data: number }[]
  label?: string
}

const ChartDonut = ({ value, label }: ChartDonusProps) => {
  const chartSeries = value.map((it) => it.data)
  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: value.map((it) => it.color),
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    labels: value.map((it) => it.label),
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
  }

  return (
    <div className="flex justify-center flex-col items-center space-y-4 ">
      <p className="text-[18px] font-normal">{label}</p>
      <Chart
        height={120}
        options={chartOptions}
        series={chartSeries}
        type="donut"
      />
    </div>
  )
}

export default ChartDonut
