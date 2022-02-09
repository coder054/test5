import { SvgCamera } from 'imports/svgs'
import cls from './upload-image.module.css'

interface UploadImageProps {
  title?: string
  text?: string
  className?: string
  ChangeUpload?: () => void
}

export const UploadImage = ({ title, text, className }: UploadImageProps) => {
  const handleChangeUpload = () => {}
  return (
    <div className={`${className}`}>
      <p className="text-base text-[#FFFFFF]">{title}</p>
      <div className="">
        <div
          className={`${cls.uploadImage} w-[223px] h-[130px] cursor-pointer rounded-[8px] mt-[12px] text-center`}
        >
          <div className="w-8 h-[23px] m-auto pt-[18px]">
            <SvgCamera />
          </div>
          <div className="w-full pt-[32px] pl-[57.5px] pr-[57.5px]">
            <p className="text-[12px] text-[#818389] text-center">{text}</p>
          </div>
          <img src="" alt="" />
        </div>
        <input
          type={'file'}
          hidden
          className="w-full h-full"
          onChange={handleChangeUpload}
        />
      </div>
    </div>
  )
}
