import { AccountSettingsType } from 'constants/types/settingsType.type'
import { atom } from 'jotai'

export const settingsAtom = atom<AccountSettingsType>({})
