import { useQuery } from 'react-query'
import { Loading } from 'src/components/MyLoading'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { CardFeedType } from 'src/constants/types/feed/yours'
import { InfoPlayerWithCircleImage } from 'src/modules/biography/InfoPlayerWithCircleImage'
import { getBioGraphyPlayer } from 'src/service/feed/yours.service'

interface SharedBiographyProps {
  card?: CardFeedType
}

export const SharedBiography = ({ card }: SharedBiographyProps) => {
  const { isLoading: loading, data } = useQuery(
    [QUERIES_FEED.FEED_SHARED_BIOGRAPHY_POST, card?.userInfo?.username],
    () => getBioGraphyPlayer(card?.userInfo?.username),
    {
      onSuccess: (res) => {},
    }
  )

  return (
    <Loading isLoading={loading}>
      <InfoPlayerWithCircleImage
        dataBio={data?.data}
        feedPost
        countryFlagUrl={card?.bioInfo?.countryFlagUrl}
      />
    </Loading>
  )
}
