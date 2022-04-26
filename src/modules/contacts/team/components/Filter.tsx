import { MenuItem } from '@material-ui/core'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { ATOM_FILTER_CONTACT } from 'src/atoms/filter-contact'
import { MyInput } from 'src/components'
import { Button } from 'src/components/Button'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { ContactsTabType } from 'src/constants/types/contacts.types'
import { InfiniteScrollClub } from 'src/modules/account-settings/football/components/InfiniteScrollClub'

type FilterProps = {
  onChange?: (value: { clubId: string; country: string; role: string }) => void
  tab?: ContactsTabType
}

export const FilterTeam = ({ onChange, tab }: FilterProps) => {
  const [initial, setInitial] = useAtom(ATOM_FILTER_CONTACT)

  const submit = () => {
    onChange({
      clubId: initial.club?.clubId ?? '',
      country: initial.country?.name ?? '',
      role: initial.role,
    })
  }

  const reset = () => {
    setInitial({
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
    })
  }

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-6">
        <MySelectCountry
          label="Country"
          value={initial.country}
          onChange={(_, value) =>
            setInitial((prev) => ({ ...prev, country: value }))
          }
        />
        <InfiniteScrollClub
          label="Club"
          value={initial.club}
          handleSetClub={(value) =>
            setInitial((prev) => ({ ...prev, club: value }))
          }
        />
        {['FOLLOWERS', 'FANS', 'FRIENDS', 'TEAMMATES', 'ALL'].includes(tab) && (
          <Fragment>
            <MyInput
              onChange={(_, value) => {
                setInitial((prev) => ({ ...prev, role: value.props.value }))
              }}
              select
              label="Role"
              value={initial.role}
            >
              <MenuItem value={null}>All</MenuItem>
              <MenuItem value="COACH">Coaches</MenuItem>
              <MenuItem value="PLAYER">Players</MenuItem>
            </MyInput>
          </Fragment>
        )}
      </div>
      <div className="grid grid-cols-2 w-full gap-x-6">
        <Button
          type="submit"
          label="Filter"
          onClick={submit}
          className="bg-[#4654EA] border-2 border-[#4654EA] py-[9px] rounded-[8px] w-full"
        />
        <Button
          type="button"
          onClick={reset}
          loadingColor="#09E099"
          className="border-2 border-[#09E099] py-[9px] rounded-[8px] w-full"
          labelClass="text-[#09E099]"
          label="Reset"
        />
      </div>
    </div>
  )
}
