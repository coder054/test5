import { TrainingBarsChart } from './BarsChart'
import { TrainingCircleChart } from './CircleChart'

const TrainingChart = () => {
  return (
    <div className="bg-defaultBackGround grid laptopM:grid-cols-3 rounded-lg p-16">
      <TrainingBarsChart />
      <TrainingCircleChart />
      <div>Tags</div>
    </div>
  )
}

export default TrainingChart
