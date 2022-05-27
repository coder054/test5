import { FriendTagsType } from 'src/constants/types/feed/yours'
import Slider from 'react-slick'
import { safeHttpImage } from 'src/utils/utils'
const cls = require('./list-friend.module.css')

var settings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
}

interface ListFriendProps {
  listFriend?: FriendTagsType[]
}

export const ListFriend = ({ listFriend }: ListFriendProps) => {
  return (
    <Slider {...settings} className={` ${cls.listFiend}`}>
      {listFriend &&
        (listFriend || []).map((item) => (
          <div className={`h-[88px] flex justify-between items-center`}>
            <div className="w-[60px] text-center truncate">
              <img
                src={safeHttpImage(item.faceImage)}
                className="w-[40px] h-[40px] rounded-[8px] mx-auto object-cover"
              ></img>
              <p
                className="mt-[6px] text-[12px] text-center truncate"
                title={item?.username}
              >
                {item?.username}
              </p>
              <p
                className="mt-[2px] text-[10px] text-center truncate text-[#A2A5AD]"
                title={item?.clubName}
              >
                {item?.clubName}
              </p>
            </div>
          </div>
        ))}
    </Slider>
  )
}
