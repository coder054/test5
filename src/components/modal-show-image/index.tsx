import { SvgX } from 'src/imports/svgs'

interface ModalShowImageProps {
  url: string
  setIsOpenModal?: Function
}

export const ModalShowImage = ({
  url,
  setIsOpenModal,
}: ModalShowImageProps) => {
  const handleClose = () => {
    setIsOpenModal && setIsOpenModal(false)
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
      <img src={url && url} alt="" className="w-full h-full object-cover" />
    </div>
  )
}
