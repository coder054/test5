import { TrainingBarsChart } from './BarsChart'
import { TrainingCircleChart } from './CircleChart'
import { TrainingTags } from './Tags'

const TrainingChart = () => {
  return (
    <div className="bg-defaultBackGround grid laptopM:grid-cols-3 mobileM:space-y-8 laptopM:space-y-0 rounded-lg laptopM:p-16 mobileM:py-8 px-2">
      <TrainingBarsChart />
      <TrainingCircleChart />
      <TrainingTags />
    </div>
  )
}

export default TrainingChart
