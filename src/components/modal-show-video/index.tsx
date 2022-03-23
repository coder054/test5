import { useEffect, useRef, useState } from 'react'
import { SvgPlay, SvgX } from 'src/imports/svgs'

interface ModalShowVideoProps {
  url: string
  setIsOpenModal?: Function
}

export const ModalShowVideo = ({
  url,
  setIsOpenModal,
}: ModalShowVideoProps) => {
  const [playVideo, setPlayVideo] = useState<boolean>(true)

  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current.play()
  }, [])

  const handleClose = () => {
    setIsOpenModal && setIsOpenModal(false)
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
    <div className="w-full h-[596px] relative">
      <div onClick={handleClose}>
        <SvgX
          className={
            'w-[20px] h-[20px] text-[#ffffff] absolute top-[22px] right-[22px] cursor-pointer hover:scale-110 z-20'
          }
        />
      </div>
      <>
        <video
          ref={videoRef}
          className={`w-full h-full object-cover duration-200 ${
            !playVideo ? 'opacity-90' : ''
          }`}
          onClick={handlepauseVideo}
        >
          <source src={url && url} />
        </video>
        {!playVideo ? (
          <div
            className="absolute top-[200px] left-[304px] z-20 cursor-pointer w-[100px]"
            onClick={handleplayVideo}
          >
            <SvgPlay width={150} height={150} />
          </div>
        ) : null}
      </>
    </div>
  )
}
