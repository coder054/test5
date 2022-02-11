import { useState } from 'react'
import { SvgCamera } from 'imports/svgs'
import cls from './upload-image.module.css'
import { storage } from 'config/firebase-client'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

interface UploadImageProps {
  title?: string
  text?: string
  className?: string
  ChangeUpload?: () => void
  setImage?: Function
}

export const UploadImage = ({
  title,
  text,
  className,
  setImage,
}: UploadImageProps) => {
  const [progress, setProgress] = useState<number>(0)
  const [url, setUrl] = useState<string>('')
  const handleChangeUpload = (event) => {
    const file = event.target.files[0]
    // console.log('file', file)

    if (!file) return
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(prog)
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url)
          setImage && setImage(url)
        })
      }
    )
  }

  return (
    <div className={`${className} `}>
      <p className="text-base text-[#FFFFFF]">{title}</p>
      <div
        className={`${cls.uploadImage} w-[223px] h-[130px] cursor-pointer rounded-[8px] mt-[12px] text-center  border relative`}
      >
        {url && url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className="w-[223px] h-[130px] object-scale-down"
          />
        ) : (
          <>
            <div className="w-8 h-[23px] m-auto pt-[18px]">
              <SvgCamera />
            </div>
            <div className="w-full pt-[32px] pl-[57.5px] pr-[57.5px]">
              <p className="text-[12px] text-[#818389] text-center">{text}</p>
            </div>
          </>
        )}

        <input
          type={'file'}
          className="w-[223px] h-[130px] border border-red-400 absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleChangeUpload}
          accept=".jpg,.jpeg,.png"
        />
      </div>
    </div>
  )
}