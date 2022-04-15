import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { injuryAtom } from 'src/atoms/injuryAtom'
import { DiaryType, InjuryType } from 'src/constants/types/diary.types'
import { scaleToColor, upperFirst } from 'src/hooks/functionCommon'
import { EditInjuryArea } from './EditInjuryArea'

type InjuryList = {
  diaryUpdate: DiaryType[]
}

export const InjuryList = ({ diaryUpdate }: InjuryList) => {
  const [diary] = useAtom(diaryAtom)
  const [_, setInjury] = useAtom(injuryAtom)
  const [formValues, setFormValues] = useState<InjuryType[]>()
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

  const handleChooseInjury = (value: InjuryType) => {
    setInjury({ ...value, diaryId: diary.diaryId })
    setIsOpenDrawer(true)
  }

  useEffect(() => {
    setFormValues(diary.injuries)
  }, [JSON.stringify(diary?.injuries)])

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
      <div>
        <SwipeableDrawer
          anchor="bottom"
          sx={{ zIndex: 1300 }}
          open={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          onOpen={() => setIsOpenDrawer(true)}
        >
          <EditInjuryArea onClose={setIsOpenDrawer} />
        </SwipeableDrawer>
      </div>
      {(formValues || []).map((injury, index) => (
        <div
          onClick={() => handleChooseInjury(injury)}
          className="flex flex-1 w-full py-2.5 px-4 text-[16px] font-medium cursor-pointer hover:bg-gray-600 duration-150 rounded-[4px]"
        >
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
