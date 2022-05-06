import { FriendTagsType } from 'src/constants/types/feed/yours'
import Slider from 'react-slick'
const cls = require('./list-friend.module.css')

var settings = {
  dots: true,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
}

interface ListFriendProps {
  listFriend?: FriendTagsType[]
}

export const ListFriend = ({ listFriend }: ListFriendProps) => {
  // console.log('listFriend', listFriend)

  return (
    <Slider {...settings} className="h-[80px]">
      {listFriend &&
        (listFriend || []).map((item) => (
          <div className={`h-[88px] flex justify-between items-center `}>
            <div className="w-[40px] text-center truncate">
              <img src={item.faceImage} className="w-[40px] h-[40px]"></img>
              <span className="mt-[4px]" title={item?.clubName}>
                {item?.clubName}
              </span>
            </div>
          </div>
        ))}
    </Slider>
  )
}
