import { CardFeedType } from 'src/constants/types/feed/yours'

interface PersonalGoalsType {
  card: CardFeedType
}

export const PersonalGoals = ({ card }: PersonalGoalsType) => {
  return (
    <div className="pl-[16px] pr-[16px] w-full">
      <div className="w-full text-center">
        <p className="text-[24px]">Goal Fulfillment</p>
        <div
          className="w-[80px] h-[80px] flex justify-center items-center border-[#09E099] rounded-full
          border-2 mx-auto mt-[8px]"
        >
          <span className="text-[#09E099] text-[28px]">{card?.progress}%</span>
        </div>
      </div>
      <div className="mt-[24px]">
        {card?.headline && <p className="text-[18px]">{card?.headline}</p>}
        {card?.description && (
          <p className="text-[14px] text-[#cacece]">{card?.description}</p>
        )}
      </div>
    </div>
  )
}
