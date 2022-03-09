import { useState } from 'react'
import { SvgCamera } from 'src/imports/svgs'
const cls = require('./upload-image.module.css')
import { storage } from 'src/config/firebase-client'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import clsx from 'clsx'

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
    <div className={`${className}`}>
      <p className="text-base text-[#FFFFFF]">{title}</p>
      <div
        className={`${cls.uploadImage} ${classNameInner} w-[223px] h-[130px] cursor-pointer rounded-[8px] mt-[12px] text-center  border relative`}
      >
        {url && url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className={`w-[223px] h-[128px] rounded-[8px] object-cover`}
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
      {errorMessage && (
        <p className="text-[#D60C0C] text-[14px]">{errorMessage}</p>
      )}
    </div>
  )
}
