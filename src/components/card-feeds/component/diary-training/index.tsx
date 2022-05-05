import { ChartCircle } from 'src/components/chart-circle'
import { CardFeedType } from 'src/constants/types/feed/yours'
import Slider from 'react-slick'
import { ItemTraining } from './item/item-training'
import { settings } from 'src/constants/constants'
import { useQuery } from 'react-query'
import { getDiaryById } from 'src/service/feed/yours.service'
import { ItemLineChart } from './item/item-line-chart'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { ItemInjuries } from './item/item-injuries'
import { isEmpty } from 'lodash'

const cls = require('../../card-yours.module.css')

interface CardDiaryTrainingProps {
  card: CardFeedType
}

export const CardDiaryTraining = ({ card }: CardDiaryTrainingProps) => {
  const { isLoading, data } = useQuery(
    [QUERIES_FEED.FEED_GET_DIARY_BY_ID],
    () => getDiaryById(card?.postId),
    {
      onSuccess: (res) => {},
    }
  )

  // console.log('diary:', data)
  return (
    <Slider {...settings} className={`h-[235px]  ${cls.carouse}`}>
      <div className="h-[225px]">
        <ItemTraining card={card && card} />
      </div>

      {!isEmpty(data?.data?.eatChart) ||
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
      ) : null}
    </Slider>
  )
}
