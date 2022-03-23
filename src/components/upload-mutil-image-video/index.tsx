import { useState } from 'react'
import { SvgCamera, SvgVideo } from 'src/imports/svgs'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/config/firebase-client'
import toast from 'react-hot-toast'
import { useAtom } from 'jotai'
import { listMediaAtom } from 'src/atoms/listMediaAtom'

interface UploadMutilImageVideoProps {
  image?: boolean
  arrayFiles?: any
  setArrayFiles?: Function
  setProgress?: Function
}

export const UploadMutilImageVideo = ({
  image,
  arrayFiles,
  setArrayFiles,
  setProgress,
}: UploadMutilImageVideoProps) => {
  const [listMedia, setListMedia] = useAtom(listMediaAtom)
  const [items, setItems] = useState<string[]>([])
  const [progress, setProgressImageVideo] = useState<number>(0)

  const handleChangeImage = (event) => {
    const files = event.target.files
    if (!files[0]?.name) {
      return
    }

    if (arrayFiles.length + files.length > 9) {
      toast.error('You can not upload bigger than 9 file.')
      return
    }
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
          setProgressImageVideo(prog)
          setProgress && setProgress(prog)
        },
        function error(err) {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setItems((prev) => [...prev, url])
            setArrayFiles((prev) => [...prev, url])
            setListMedia((prev) => [...prev, url])
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
