import { atom } from 'jotai'
import { DiaryResponseType, DiaryType } from 'src/constants/types/diary.types'

export const diaryResponseAtom = atom<DiaryResponseType>({})
export const diaryAtom = atom<DiaryType>({
  eatAndDrink: 'NORMAL',
  energyLevel: 'NORMAL',
  sleep: 'NORMAL',
  typeOfDiary: 'TRAINING',
})
