import { ChartCircle } from 'src/components/chart-circle'

export const DetailChart = () => {
  const ArrayPercentYou = [[50, 30, 20, 5, 5]]
  const ArrayPercentAvg = [[10, 70, 20, 5, 5]]
  const ArrayColor = [['#4654EA', '#07E1FF', '#09E099', '#E85CFF', '#D60C0C']]
  const ArrayLabel = [['Very good', 'Good', 'Normal', 'Bad', 'Very bad']]

  return (
    <div className="w-full h-[174px] bg-[#13161A] mt-[18px] rounded-[8px] p-[24px] flex">
      <div className="flex-1">
        <p className="ml-[38px]">You</p>
        <ChartCircle
          type="wellness"
          index={0}
          ArrayPercent={ArrayPercentYou}
          ArrayLabel={ArrayLabel}
          ArrayColor={ArrayColor}
        />
      </div>
      <div className="flex-1 -ml-[24px] mr-[24px] ">
        <p className="text-[#4654EA] text-[14px]">Very good</p>
        <p className="text-[#07E1FF] text-[14px]">Good</p>
        <p className="text-[#09E099] text-[14px]">Normal</p>
        <p className="text-[#E85CFF] text-[14px]">bad</p>
        <p className="text-[#D60C0C] text-[14px]">Very bad</p>
      </div>
      <div className="flex-1">
        <p className="ml-[24px]">Average</p>
        <ChartCircle
          index={0}
          ArrayColor={ArrayColor}
          ArrayPercent={ArrayPercentAvg}
          type="wellness"
          ArrayLabel={ArrayLabel}
        />
      </div>
    </div>
  )
}
