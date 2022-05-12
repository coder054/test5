import { atom } from 'jotai'
import { DiaryResponseType, DiaryType } from 'src/constants/types/diary.types'
import { getToday } from 'src/hooks/functionCommon'

export const diaryResponseAtom = atom<DiaryResponseType>({})
export const diaryAtom = atom<DiaryType>({
  eatAndDrink: 'NORMAL',
  energyLevel: 'NORMAL',
  sleep: 'NORMAL',
  typeOfDiary: 'TRAINING',
})

export const openModalDiaryUpdateAtom = atom(false)
export const dateAtom = atom<string | Date>(getToday())

// const [openModalDiaryUpdate, setOpenModalDiaryUpdate] = useAtom(openModalDiaryUpdateAtom)
// const [date, setDate] = useAtom(dateAtom)
