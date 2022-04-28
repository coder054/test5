import { ChartCircle } from 'src/components/chart-circle'
import { CardFeedType } from 'src/constants/types/feed/yours'

interface ItemTrainingProps {
  card: CardFeedType
}

export const ItemTraining = ({ card }: ItemTrainingProps) => {
  return (
    <div className="relative h-[60px]">
      <div className="absolute left-0 -bottom-[60px]">
        <ChartCircle
          index={0}
          type={'feed'}
          ArrayColor={['#E85CFF', '#4654EA', '#07E1FF', '#09E099']}
          ArrayLabel={Object.keys(card?.trainingCategory)}
          ArrayPercent={Object.values(card?.trainingCategory)}
        />
      </div>
      <div className="absolute right-0 top-[14px]">
        <div className="w-full flex flex-row-reverse">
          <div className="w-[80px] h-[38px] rounded-[8px] bg-[#13161A] mr-[20px]">
            <p className="text-[#A2A5AD] text-[14px] p-[8px]">1h 45min</p>
          </div>
        </div>
      </div>
    </div>
  )
}
