import clsx from 'clsx'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { storage } from 'src/config/firebase-client'
import { SvgCamera } from 'src/imports/svgs'
const cls = require('./upload-image.module.css')

interface UploadImageProps {
  value?: string
  title?: string
  text?: string
  width?: number | string
  height?: number
  textClass?: string
  iconClass?: string
  className?: string
  ChangeUpload?: () => void
  setImage?: Function
}

export const CustomUploadImage = ({
  value,
  title,
  text,
  width,
  height,
  textClass,
  className,
  iconClass,
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
      // (snapshot) => {
      //   const prog = Math.round(
      //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //   )
      //   setProgress(prog)
      // },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url)
          setImage && setImage(url)
        })
      }
    )
  }

  useEffect(() => {
    value && setUrl(value)
  }, [value])

  return (
    <div>
      {title && <p className="text-base text-[#FFFFFF] md:absolute">{title}</p>}
      <div
        style={{ width: width, height: height }}
        className={`${cls.uploadImage} ${className} md:top-[36px] cursor-pointer rounded-[8px] mt-[12px] text-center relative`}
      >
        {url && url ? (
          <img
            src={url}
            style={{ width: width, height: height - 4 }}
            alt=""
            className={`${className} rounded-[8px] object-cover`}
          />
        ) : (
          <>
            <div className={clsx('w-8 h-[23px] m-auto ', iconClass)}>
              <SvgCamera />
            </div>
            <div className={clsx(textClass)}>
              <p className="text-[13px] text-[#818389] text-center">{text}</p>
            </div>
          </>
        )}

        <input
          type={'file'}
          style={{ width: width, height: height }}
          className={`${className} border border-red-400 absolute inset-0 opacity-0 cursor-pointer`}
          onChange={handleChangeUpload}
          accept=".jpg,.jpeg,.png"
        />
      </div>
    </div>
  )
}
