import { IteamImage } from './component/item'

interface ListImageVideoProps {
  arrayFile: string[]
  setArrayFile?: Function
}

export const ListImageVideo = ({
  arrayFile,
  setArrayFile,
}: ListImageVideoProps) => {
  const handleRemoveItem = (urlRemove: string) => {
    const newLlist = arrayFile.filter((item) => item !== urlRemove)
    setArrayFile(newLlist)
  }

  return (
    <div className="w-full grid grid-cols-7 gap-4">
      {arrayFile.map((item) => (
        <IteamImage
          url={item}
          setArrayFile={setArrayFile}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
    </div>
  )
}
