import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SvgClose, SvgPlay } from 'src/imports/svgs'
const cls = require('./item.module.css')

interface ItemImageProps {
  url?: string
  setArrayFile?: Function
  handleRemoveItem?: Function
}

export const IteamImage = ({
  url,
  setArrayFile,
  handleRemoveItem,
}: ItemImageProps) => {
  const [isVideo, setIsVideo] = useState<boolean>(url.includes('mp4'))
  const [playVideo, setPlayVideo] = useState<boolean>(false)
  const videoRef = useRef(null)

  const handleRemoveImage = () => {
    // console.log('url', url)

    handleRemoveItem && handleRemoveItem(url)
  }

  const handleplayVideo = () => {
    if (!playVideo) {
      setPlayVideo(true)
      videoRef.current.play()
    }
  }

  const handlepauseVideo = () => {
    if (playVideo) {
      setPlayVideo(false)
      videoRef.current.pause()
    }
  }

  return (
    <div className={`${cls.image} w-[64px] h-[64px] rounded-[4px] relative`}>
      <div
        className="absolute top-[4px] right-[4px] z-30 cursor-pointer hover:scale-150 duration-150"
        onClick={handleRemoveImage}
      >
        <SvgClose />
      </div>
      {!isVideo ? (
        <img
          src={url}
          alt=""
          className={`${cls.image} absolute w-[64px] h-[64px] rounded-[4px] opacity-70 z-10 hover:scale-105 duration-200 object-cover`}
        />
      ) : (
        <>
          <video
            ref={videoRef}
            className={`${cls.image} absolute w-[64px] h-[64px] rounded-[4px] opacity-70 z-10 hover:scale-105 duration-200 object-cover`}
            onClick={handlepauseVideo}
          >
            <source src={url} />
          </video>
          {!playVideo ? (
            <div
              className="absolute top-[20px] left-[20px] z-20 cursor-pointer"
              onClick={handleplayVideo}
            >
              <SvgPlay />
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
