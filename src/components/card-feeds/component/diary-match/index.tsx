import { CardFeedType } from 'src/constants/types/feed/yours'
import Slider from 'react-slick'
import { settings } from 'src/constants/constants'
import { ItemMatch } from './item/item-match'

const cls = require('../../card-yours.module.css')

interface CardDiaryMatchProps {
  card: CardFeedType
}

export const CardDiaryMatch = ({ card }: CardDiaryMatchProps) => {
  // console.log('card traning:', card)

  return (
    <Slider {...settings} className={`min-h-[235px]  ${cls.carouse}`}>
      <div className="h-[235px]">
        <ItemMatch card={card && card} />
      </div>
      <div className="h-[235px]">
        <ItemMatch card={card && card} />
      </div>
    </Slider>
  )
}
