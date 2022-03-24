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
    let arrFileNew = [...arrayFile]

    let findIndex = arrayFile.findIndex((o) => o === urlRemove)
    if (findIndex !== -1) {
      arrFileNew.splice(findIndex, 1)
      setArrayFile(arrFileNew)
      return
    }
  }

  return (
    <div className="w-full grid grid-cols-7 gap-4  ">
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
