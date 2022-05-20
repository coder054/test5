import { CardFeedType } from 'src/constants/types/feed/yours'
import { ItemTraining } from './item/item-training'

interface CardDiaryTrainingProps {
  card: CardFeedType
}

export const CardDiaryTraining = ({ card }: CardDiaryTrainingProps) => {
  return (
    <div>
      <div className="h-[225px] pl-[20px]">
        <ItemTraining card={card && card} />
      </div>
    </div>
  )
}
