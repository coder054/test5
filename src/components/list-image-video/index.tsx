import { url } from 'inspector'
import { IteamImage } from './component/item'

interface ListImageVideoProps {
  arrayFile: string[]
  setArrayFile?: Function
  setProgress?: Function
  progress?: number
  handleShow?: Function
  setIsOpenModal?: Function
  setNewFile?: Function
  newFile?: string[]
}

export const ListImageVideo = ({
  arrayFile,
  setArrayFile,
  setProgress,
  progress,
  handleShow,
  setIsOpenModal,
  newFile,
}: ListImageVideoProps) => {
  const handleRemoveItem = (urlRemove: string) => {
    // console.log('urlRemove', urlRemove)
    if (!urlRemove.includes('.mp4')) {
      const newList = arrayFile.filter((item) => item !== urlRemove)
      // console.log('newLlist', newList)

      setArrayFile && setArrayFile(newList)
    } else {
      const findItemRemove = arrayFile.findIndex((item) => item === urlRemove)
      let res = []
      for (let i = 0; i < arrayFile.length; i++) {
        if (i !== findItemRemove) {
          res.push(arrayFile[i])
          console.log('i', i)
        }
      }
      console.log('res', res)

      setArrayFile && setArrayFile(res)
    }
    // const findItemRemove = arrayFile.findIndex((item) => item === urlRemove)
    // let newList = arrayFile
    // newList.splice(findItemRemove, 1)
  }
  // console.log('arrayFile', arrayFile)

  return (
    <div className="w-full grid grid-cols-7 gap-4">
      {arrayFile &&
        arrayFile.map((item) => (
          <IteamImage
            progress={progress}
            url={item}
            setArrayFile={setArrayFile}
            handleRemoveItem={handleRemoveItem}
            handleShow={handleShow}
            setIsOpenModal={setIsOpenModal}
          />
        ))}
    </div>
  )
}
