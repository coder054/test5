import { useState } from 'react'
import ReactPlayer from 'react-player'
import Slider from 'react-slick'
import { settings } from 'src/constants/constants'
import { safeAvatar } from 'src/utils/utils'
const cls = require('../../card-yours.module.css')

const contentStyle: any = {
  height: '195px',
  color: '#fff',
  textAlign: 'center',
  background: '#000000',
}

interface CardRssNewsProps {
  mediaLinks?: {
    type?: string
    url?: string
    uniqueKey?: string
  }[]
}

export const CardPlainPost = ({ mediaLinks }: CardRssNewsProps) => {
  const [play, setPlay] = useState<boolean>(false)
  const handlePlayVideo = () => {
    setPlay(!play)
  }

  return (
    <Slider className="max-h-[195px]" {...settings}>
      {mediaLinks &&
        mediaLinks.map((item, index) => (
          <div key={index} className="max-h-[195px]">
            <div style={contentStyle} className="flex w-full">
              <div className={`${cls.image} flex-1`}>
                {item.type === 'IMAGE' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={safeAvatar(item?.url)}
                    alt=""
                    className="object-cover w-full max-h-[195px]"
                  />
                ) : null}
                {item.type === 'VIDEO' ? (
                  <div
                    className={`${
                      play ? '' : 'opacity-70'
                    } w-full h-[195px] object-cover cursor-pointer flex justify-between items-center relative`}
                    onClick={handlePlayVideo}
                  >
                    <ReactPlayer
                      url={item?.url}
                      controls
                      width={500}
                      height={195}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
    </Slider>
  )
}
