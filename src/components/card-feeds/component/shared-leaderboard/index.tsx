import { LeaderBoard } from 'src/components/leader-board'
import { CardFeedType } from 'src/constants/types/feed/yours'

interface SharedLeaderBoardType {
  card: CardFeedType
}

export const SharedLeaderBoard = ({ card }: SharedLeaderBoardType) => {
  return (
    <div>
      <div className="pl-[24px] pr-[24px]">
        <span>
          {card?.lastDateRange}, {card?.country}
        </span>{' '}
        <span className="text-[#09E099]">
          - {card?.category?.charAt(0)}
          {card?.category?.slice(1).toLowerCase()}
        </span>
      </div>

      {card?.data ? (
        <LeaderBoard
          master
          tabLeaderBoard
          // @ts-ignore
          listMasterLeaderBoard={JSON.parse(card?.data)}
        />
      ) : null}
    </div>
  )
}
