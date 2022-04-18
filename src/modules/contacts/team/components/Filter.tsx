import { useAtom } from 'jotai'
import { ATOM_FILTER_CONTACT } from 'src/atoms/filter-contact'
import { Button } from 'src/components/Button'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { InfiniteScrollClub } from 'src/modules/account-settings/football/components/InfiniteScrollClub'

type FilterProps = {
  onChange?: (value: { clubId: string; countryName: string }) => void
}

export const FilterTeam = ({ onChange }: FilterProps) => {
  const [initial, setInitial] = useAtom(ATOM_FILTER_CONTACT)

  const submit = () => {
    onChange({
      clubId: initial.club !== null ? initial.club.clubId : '',
      countryName: initial.country !== null ? initial.country.name : '',
    })
  }

  const reset = () => {
    setInitial({ club: null, country: null })
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
