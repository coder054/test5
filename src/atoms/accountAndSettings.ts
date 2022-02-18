import { AccountSettingsType } from 'src/constants/types/settingsType.type'
import { atom } from 'jotai'

export const settingsAtom = atom<AccountSettingsType>({})
