import { useAtom } from 'jotai'
import { dashboardTraining } from 'src/atoms/dashboardTrainingAtom'
import BarsChart from 'src/components/bars-chart'

export const TrainingBarsChart = () => {
  const [training] = useAtom(dashboardTraining)

  return (
    <div className="flex space-x-20 justify-center">
      <div className="flex flex-col items-center">
        <p className="font-bold text-[17px]">Session</p>
        <BarsChart
          personal={training?.personalSessions}
          average={training?.averageSessions}
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold text-[17px]">Hours</p>
        <BarsChart
          unit="h"
          personal={training?.personalTrainingHours}
          average={training?.averageTrainingHours}
        />
      </div>
    </div>
  )
}
