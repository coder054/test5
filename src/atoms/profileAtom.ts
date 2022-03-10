import { atom } from 'jotai'
import {
  ProfileCoachType,
  ProfilePlayerType,
} from 'src/constants/types/profiles.type'

export const profileAtom = atom<ProfilePlayerType>({})
export const profileCoachAtom = atom<ProfileCoachType>({})
