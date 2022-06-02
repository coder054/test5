import { CardFeedType } from 'src/constants/types/feed/yours'
import { PerformaneStrain } from '../../performance-strain'
import { ResultMatch } from './result-match'

interface ItemMatchProps {
  card: CardFeedType
}

export const ItemMatch = ({ card }: ItemMatchProps) => {
  return (
    <div className="w-full h-full pr-[20px]">
      <ResultMatch stat={card?.match} />

      <div className="w-full h-[48px] flex mt-[16px]">
        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left">
            <p className="text-[12px] font-bold">Min</p>
            <p className="text-[14px] font-thin">
              {card?.matchStats?.playingTime}/90m
            </p>
          </div>
          <div className="h-[24px] w-[1px] bg-[#484A4D] float-left mt-[8px]"></div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left">
            <p className="text-[12px] font-bold">Role</p>
            <p className="text-[14px] font-thin">{card?.matchStats?.role}</p>
          </div>
          <div className="h-[24px] w-[1px] bg-[#484A4D] float-left mt-[8px]"></div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left">
            <p className="text-[12px] font-bold">Goals/Ass</p>
            <p className="text-[14px] font-thin">
              {card?.matchStats?.goals}/{card?.matchStats?.assists}
            </p>
          </div>
          <div className="h-[24px] w-[1px] bg-[#484A4D] float-left mt-[8px]"></div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left">
            <p className="text-[12px] font-bold">Yellow/Red</p>
            <p className="text-[14px] font-thin">
              {card?.matchStats?.yellowCard}/{card?.matchStats?.redCard}
            </p>
          </div>
        </div>
      </div>

      <PerformaneStrain
        performance={card?.match}
        playerPerformance={card?.match?.review?.playerPerformance}
        teamPerformance={card?.match?.review?.teamPerformance}
        yourPhysicallyStrain={card?.match?.review?.physicallyStrain}
        teamPhysicallyStrain={card?.match?.review?.teamPhysicallyStrain}
      />
    </div>
  )
}
