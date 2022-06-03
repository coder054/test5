import { useAtom } from 'jotai'
import { dashboardTrainingAndMatchAtom } from 'src/atoms/dashboard'
import { ChartTotal } from 'src/components/chart-total'

const cls = require('../../overview.module.css')

interface TrainingTotalProps {
  loading?: boolean
  ArrayTrainingMatchTotal?: any
}

export const TrainingTotal = ({
  loading,
  ArrayTrainingMatchTotal,
}: TrainingTotalProps) => {
  const [dataTrainingAndMatch, setDataTrainingAndMatch] = useAtom(
    dashboardTrainingAndMatchAtom
  )

  return (
    <div className="grid grid-cols-3 lg:gap-2">
      <ChartTotal
        personalHours={dataTrainingAndMatch.personalTrainingHours}
        averageHours={dataTrainingAndMatch.averageTrainingHours}
        index={1}
      />
      <ChartTotal
        personalHours={dataTrainingAndMatch.personalMatchHours}
        averageHours={dataTrainingAndMatch.averageMatchHours}
        index={2}
      />
      <ChartTotal
        personalHours={dataTrainingAndMatch.personalTotalHours}
        averageHours={dataTrainingAndMatch.averageTotalHours}
        index={3}
      />
    </div>
  )
}
