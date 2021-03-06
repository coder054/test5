import { useEffect, useMemo, useRef } from 'react'
import { Loading } from 'src/components/loading/loading'
import { SvgClose, SvgPlay } from 'src/imports/svgs'
const cls = require('./item.module.css')

interface ItemImageProps {
  url?: string
  setArrayFile?: Function
  handleRemoveItem?: Function
  setIsOpenModal?: Function
  handleShow?: Function
  progress?: number
}

export const IteamImage = ({
  url,
  handleRemoveItem,
  setIsOpenModal,
  handleShow,
  progress,
}: ItemImageProps) => {
  const videoRef = useRef(null)

  const handleRemoveImage = (url) => {
    handleRemoveItem && handleRemoveItem(url)
  }

  const handleShowImage = () => {
    setIsOpenModal && setIsOpenModal(true)
    handleShow && handleShow(url)
  }

  const isVideo = useMemo(() => {
    return url.includes('mp4')
  }, [url])

  return (
    <div className={`${cls.image} w-[64px] h-[64px] rounded-[4px] relative`}>
      <div
        className="absolute top-[4px] right-[4px] z-30 cursor-pointer hover:scale-150 duration-150"
        onClick={() => {
          handleRemoveImage(url)
        }}
      >
        <SvgClose />
      </div>
      {!isVideo ? (
        <img
          onClick={handleShowImage}
          src={url}
          alt=""
          className={`${cls.image} absolute w-[64px] h-[64px] rounded-[4px] opacity-70 z-10 hover:scale-105 duration-200 object-cover`}
        />
      ) : (
        <>
          <video
            onClick={handleShowImage}
            ref={videoRef}
            className={`${cls.image} absolute w-[64px] h-[64px] rounded-[4px] opacity-70 z-10 hover:scale-105 duration-200 object-cover`}
          >
            <source src={url} />
          </video>
          <div
            className="absolute top-[20px] left-[20px] z-20 cursor-pointer"
            onClick={handleShowImage}
          >
            <SvgPlay />
          </div>
        </>
      )}
    </div>
  )
}
