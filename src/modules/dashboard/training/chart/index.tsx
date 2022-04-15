import { TrainingBarsChart } from './BarsChart'
import { TrainingCircleChart } from './CircleChart'
import { TrainingTags } from './Tags'

const TrainingChart = () => {
  return (
    <div className="bg-defaultBackGround grid laptopM:grid-cols-3 rounded-lg p-16">
      <TrainingBarsChart />
      <TrainingCircleChart />
      <TrainingTags />
    </div>
  )
}

export default TrainingChart
