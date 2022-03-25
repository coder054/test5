import clsx from 'clsx'
import { useAtom } from 'jotai'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { scaleToColor, upperFirst } from 'src/hooks/functionCommon'

export const InjuryList = () => {
  const [diary] = useAtom(diaryAtom)

  return (
    <div>
      <div className="flex flex-1 w-full bg-[#13161A] py-2 px-4 text-[#A2A5AD] text-[16px] font-medium mb-2">
        <div className="w-[100px]">Order</div>
        <div className="grid grid-cols-3 w-full ">
          <p>Area</p>
          <p>Pain level</p>
          <p>Tags</p>
        </div>
      </div>
      {(diary.injuries || []).map((injury, index) => (
        <div className="flex flex-1 w-full py-2.5 px-4 text-[16px] font-medium cursor-pointer hover:bg-gray-600 duration-150 rounded-[4px]">
          <div className="w-[100px]">{index + 1}</div>
          <div className="grid grid-cols-3 w-full ">
            <p>{injury.injuryArea}</p>
            <p className={clsx(scaleToColor(injury.painLevel))}>
              {upperFirst(injury.painLevel.replace('_', ' '))}
            </p>
            <p>{(injury.injuryTags || []).map((it) => it).join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
