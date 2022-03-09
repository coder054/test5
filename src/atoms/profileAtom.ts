import { atom } from 'jotai'
import { ProfilePlayerType } from 'src/constants/types/profiles.type'

export const profileAtom = atom<ProfilePlayerType>({})
