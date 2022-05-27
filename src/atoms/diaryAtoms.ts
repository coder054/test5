import { atom } from 'jotai'
import {
  DiaryResponseType,
  DiaryType,
  ParticipateType,
  PlayerReviewsType,
} from 'src/constants/types/diary.types'
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
export const COACH_DIARY_ATOM = atom<ParticipateType>(undefined)
export const COACH_MATCH_ATOM = atom(undefined)
export const PlAYER_REVIEWS = atom<PlayerReviewsType[]>([])
