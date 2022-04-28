import { ChartCircle } from 'src/components/chart-circle'
import { CardFeedType } from 'src/constants/types/feed/yours'
import Slider from 'react-slick'
import { ItemTraining } from './item-training'

const cls = require('../../card-yours.module.css')

interface CardDiaryTrainingProps {
  card: CardFeedType
}

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
}

export const CardDiaryTraining = ({ card }: CardDiaryTrainingProps) => {
  console.log('card traning:', card)
  const optionTraining = [
    {
      index: '1',
      type: 'training',
    },
    {
      index: '2',
      type: 'line',
    },
    {
      index: '3',
      type: 'injury',
    },
  ]

  return (
    <Slider {...settings} className={`h-[195px]  ${cls.carouse}`}>
      {optionTraining.map((item, index) => (
        <div className="h-[195px]" key={index}>
          <ItemTraining card={card && card} />
        </div>
      ))}
    </Slider>
  )
}
