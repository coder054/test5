import { SvgCamera } from 'imports/svgs'
import cls from './upload-image.module.css'
import { storage } from 'config/firebase-client'

interface UploadImageProps {
  title?: string
  text?: string
  className?: string
  ChangeUpload?: () => void
}

export const UploadImage = ({ title, text, className }: UploadImageProps) => {
  const handleChangeUpload = (event) => {
    const image = event.target.files[0]
    console.log('image', image)
  }

  return (
    <div className={`${className} `}>
      <p className="text-base text-[#FFFFFF]">{title}</p>
      <div
        className={`${cls.uploadImage} w-[223px] h-[130px] cursor-pointer rounded-[8px] mt-[12px] text-center  border relative`}
      >
        <div className="w-8 h-[23px] m-auto pt-[18px]">
          <SvgCamera />
        </div>
        <div className="w-full pt-[32px] pl-[57.5px] pr-[57.5px]">
          <p className="text-[12px] text-[#818389] text-center">{text}</p>
        </div>
        {/* <img src="" alt="" /> */}
        <input
          type={'file'}
          className="w-[223px] h-[130px] border border-red-400 absolute inset-0 opacity-0"
          onChange={handleChangeUpload}
          accept=".jpg,.jpeg,.png"
        />
      </div>
    </div>
  )
}
