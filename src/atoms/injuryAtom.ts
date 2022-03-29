import { atom } from 'jotai'
import { InjuryType } from 'src/constants/types/diary.types'

export const INITIAL_INJURY = {
  createdAt: null,
  description: '',
  diaryId: '',
  injuryArea: '',
  injuryId: '',
  injuryMedia: [],
  injuryPosition: { x: null, y: null },
  injuryTags: [],
  isFront: true,
  painLevel: '',
  treatment: '',
  updatedAt: null,
  userId: '',
}

export const injuryAtom = atom<InjuryType>(INITIAL_INJURY)
