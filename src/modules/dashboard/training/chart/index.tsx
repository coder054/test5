import { TrainingBarsChart } from './BarsChart'
import { TrainingCircleChart } from './CircleChart'
import { TrainingTags } from './Tags'

const TrainingChart = () => {
  return (
    <div className="bg-defaultBackGround rounded-lg">
      <div className="text-center pt-[12px]">
        <p className="text-[#09E099] text-[18px]">Training makes you better!</p>
        <p className="text-[#A2A5AD]">
          The Training Dashboard compares your Training hours with your peers.
        </p>
      </div>
      <div className=" grid laptopM:grid-cols-3 mobileM:space-y-8 laptopM:space-y-0 laptopM:p-16 mobileM:py-8 px-2">
        <TrainingBarsChart />
        <TrainingCircleChart />
        <TrainingTags />
      </div>
    </div>
  )
}

export default TrainingChart
