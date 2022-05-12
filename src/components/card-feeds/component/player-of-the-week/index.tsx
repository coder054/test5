import { useQuery } from 'react-query'
import { Loading } from 'src/components/MyLoading'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { CardFeedType } from 'src/constants/types/feed/yours'
import { InfoPlayerWithCircleImage } from 'src/modules/biography/InfoPlayerWithCircleImage'
import { getBioGraphyPlayer } from 'src/service/feed/yours.service'

interface PlayerOfTheWeekType {
  card: CardFeedType
}

export const PlayerOfTheWeek = ({ card }: PlayerOfTheWeekType) => {
  const { isLoading: loading, data } = useQuery(
    [QUERIES_FEED.FEED_PLAYER_OF_THE_WEEK],
    () => getBioGraphyPlayer(card?.bioInfo?.username),
    {
      onSuccess: (res) => {},
    }
  )

  return (
    <Loading isLoading={loading}>
      <>
        <p className="text-[22px] text-center mb-[12px]">{card?.title}</p>
        <InfoPlayerWithCircleImage
          dataBio={data?.data}
          feedPost
          countryFlagUrl={card?.bioInfo?.countryFlagUrl}
        />
        <p className="text-[16px] pl-[20px] pr-[20px] mt-[12px]">
          With {card?.sessions} matches and {card?.wins} wins, {card?.goals}{' '}
          Goals and {card?.assists} Assist and {card?.ztar} Ztar of the Match.
          Combined with {card?.hours}h of training, makes{' '}
          <span className="text-[#09E099]">{card?.bioInfo?.firstName}</span>{' '}
          Zporters Player of the week.
        </p>
      </>
    </Loading>
  )
}
