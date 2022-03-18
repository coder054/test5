import { useState } from 'react'
import { SvgCamera, SvgVideo } from 'src/imports/svgs'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/config/firebase-client'
import toast from 'react-hot-toast'

interface UploadMutilImageVideoProps {
  image?: boolean
  arrayFiles?: any
  setArrayFiles?: Function
}

export const UploadMutilImageVideo = ({
  image,
  arrayFiles,
  setArrayFiles,
}: UploadMutilImageVideoProps) => {
  const [items, setItems] = useState<string[]>([])
  const [progress, setProgress] = useState<number>(0)

  const handleChangeImage = (event) => {
    const files = event.target.files
    if (!files[0]?.name) {
      return
    }
    // if (items.length + files.length >= 9) {
    //   toast.error('max file is 9.')
    //   return
    // }
    for (let i = 0; i < files.length; i++) {
      uploadImageAsPromise(files[i])
    }
  }

  const uploadImageAsPromise = (file) => {
    return new Promise(function (resolve, reject) {
      const storageRef = ref(storage, `/files/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        function progress(snapshot) {
          var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(prog)
        },
        function error(err) {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setItems((prev) => [...prev, url])
            setArrayFiles((prev) => [...prev, url])
          })
        }
      )
    })
  }

  return (
    <div className="cursor-pointer w-[28px] h-[28px] relative">
      {image ? (
        <div className="hover:scale-150">
          <SvgCamera />
        </div>
      ) : (
        <SvgVideo />
      )}
      <input
        type={'file'}
        accept={image ? '.jpg,.jpeg,.png' : '.mp4'}
        multiple
        className="absolute inset-0 opacity-0"
        onChange={handleChangeImage}
      />
    </div>
  )
}
