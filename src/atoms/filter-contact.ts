import { atom } from 'jotai'
import { ClubType, CountryType } from 'src/constants/types/settingsType.type'

type AtomFilterContactType = {
  club: ClubType
  country: CountryType
}

export const ATOM_FILTER_CONTACT = atom<AtomFilterContactType>({
  club: null,
  country: null,
})
