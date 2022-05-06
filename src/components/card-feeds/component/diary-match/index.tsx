import { CardFeedType } from 'src/constants/types/feed/yours'
import Slider from 'react-slick'
import { settings } from 'src/constants/constants'
import { ItemMatch } from './item/item-match'
import { isEmpty } from 'lodash'
import { useQuery } from 'react-query'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { getDiaryById } from 'src/service/feed/yours.service'
import { ItemLineChart } from '../diary-training/item/item-line-chart'
import { ItemInjuries } from '../diary-training/item/item-injuries'

const cls = require('../../card-yours.module.css')

interface CardDiaryMatchProps {
  card: CardFeedType
}

export const CardDiaryMatch = ({ card }: CardDiaryMatchProps) => {
  // console.log('card traning:', card)
  const { isLoading, data } = useQuery(
    [QUERIES_FEED.FEED_GET_DIARY_BY_ID],
    () => getDiaryById(card?.postId),
    {
      onSuccess: (res) => {},
    }
  )

  return (
    <Slider {...settings} className={`min-h-[235px]  ${cls.carouse}`}>
      <div className="h-[235px]">
        <ItemMatch card={card && card} />
      </div>
      {/* {!isEmpty(data?.data?.eatChart) ||
      !isEmpty(data?.data?.energyChart) ||
      !isEmpty(data?.data?.sleepChart) ? (
        <div className="h-[225px]">
          <ItemLineChart card={data?.data && data?.data} loading={isLoading} />
        </div>
      ) : null}

      {!isEmpty(data?.data?.injuries) ? (
        <div className="h-[225px]">
          <ItemInjuries card={data?.data} />
        </div>
      ) : null} */}
    </Slider>
  )
}
