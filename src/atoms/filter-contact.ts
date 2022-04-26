import { atom } from 'jotai'
import { ClubType, CountryType } from 'src/constants/types/settingsType.type'

type AtomFilterContactType = {
  club: ClubType
  country: CountryType
  role?: string
  sorted?: string
}

export const ATOM_FILTER_CONTACT = atom<AtomFilterContactType>({
  club: null,
  country: {
    name: 'Sweden',
    alpha2Code: 'SE',
    alpha3Code: 'SWE',
    region: 'Europe',
    flag: 'https://res.cloudinary.com/zporter-media-cloud/image/upload/v1626939466/country-flags/SWE.png',
    phoneCode: '+46',
  },
  role: '',
  sorted: 'asc',
})
