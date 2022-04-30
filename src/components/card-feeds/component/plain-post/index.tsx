import { useState } from 'react'
import ReactPlayer from 'react-player'
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
    <div>
      {mediaLinks &&
        mediaLinks.map((item, index) => (
          <div key={index} className="h-[195px]">
            <div style={contentStyle} className="flex w-full">
              <div className={`${cls.image} flex-1`}>
                {item.type === 'IMAGE' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item?.url}
                    alt=""
                    className="object-cover w-full h-[195px]"
                  />
                ) : null}
                {item.type === 'VIDEO' ? (
                  <div
                    className={`${
                      play ? '' : 'opacity-70'
                    } w-[347px] h-[195px] object-fill cursor-pointer flex justify-between items-center relative`}
                    onClick={handlePlayVideo}
                  >
                    <ReactPlayer url={item?.url} controls />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
