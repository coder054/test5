import { useAtom } from 'jotai'
import { dashboardTraining } from 'src/atoms/dashboardTrainingAtom'
import BarsChart from 'src/components/bars-chart'

export const TrainingBarsChart = () => {
  const [training] = useAtom(dashboardTraining)

  return (
    <div className="flex laptopM:space-x-20 mobileM:space-x-10 justify-center">
      <div className="flex flex-col space-y-4 items-center">
        <p className="font-bold text-[17px]">Sessions</p>
        <BarsChart
          personal={training?.personalSessions}
          average={training?.averageSessions}
        />
      </div>
      <div className="flex flex-col space-y-4 items-center">
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
