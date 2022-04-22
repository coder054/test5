import { MenuItem } from '@mui/material'
import clsx from 'clsx'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { MyInput } from 'src/components'
import { Button } from 'src/components/Button'
import { PeriodFilterIcon, XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { MySelect } from 'src/components/MySelect'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MySlider } from 'src/components/MySlider'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { Country } from 'src/constants/types/diary.types'
import { ClubType } from 'src/constants/types/settingsType.type'
import { SvgFilter } from 'src/imports/svgs'
import { InfiniteScrollClub } from 'src/modules/account-settings/football/components/InfiniteScrollClub'
import { InfiniteScrollTeam } from 'src/modules/account-settings/football/components/InfiniteScrollTeam'
import { AgeOfGroup, CategoryFilter, RoleFilter } from '../constants-dashboard'

type FilterLeaderboardProps = {
  label: string
  value?: string
  onChange?: (value: LastRangeDateType) => void
  className?: string
  children?: ReactElement
  option?: string
  options?: { value: string; label: string }[]
  optionLabel?: string
  healthType?: string
  health?: boolean
  optionChange?: (value: string) => void
  setFilterFormLeader?: Function
  setHealthChartType?: Function
}

interface FilterForm {
  country: Country
  ageGroup: string
  clubId: string
  yourTeams: string[]
  role: string
  category: string
  contractedClub: ClubType
  teamId: string
}

export const FilterLeaderboard = ({
  value,
  label,
  className,
  onChange,
  option,
  options,
  optionLabel,
  health,
  optionChange,
  children,
  setFilterFormLeader,
  healthType,
  setHealthChartType,
}: FilterLeaderboardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(0)
  const [lastValue, setLastValue] = useState<number>(0)
  const [currentOption, setCurrentOption] = useState<string>('')
  const [teamId, setTeamId] = useState<string>('')
  const date = new Date()

  const [filterForm, setFilterForm] = useState<FilterForm>({
    country: {
      alpha2Code: 'SE',
      alpha3Code: 'SWE',
      flag: 'https://res.cloudinary.com/zporter-media-cloud/image/upload/v1626939466/country-flags/SWE.png',
      name: 'Sweden',
      phoneCode: '+46',
      region: 'Europe',
    },
    ageGroup: 'ADULT',
    clubId: '',
    yourTeams: [''],
    role: 'All',
    category: 'HOURS',
    contractedClub: {
      arena: '',
      city: '',
      clubId: '',
      clubName: '',
      country: '',
      logoUrl: '',
      nickName: '',
      websiteUrl: null,
    },
    teamId: '',
  })

  const generateInput = (value: string) => {
    if (health) {
      switch (value) {
        case '1':
          return 0
        case '3':
          return 10
        case '6':
          return 20
        case '12':
          return 30
        case '18':
          return 40
        case '24':
          return 50
        case '36':
          return 60
      }
    } else {
      switch (value) {
        case '7':
          return 0
        case '30':
          return 10
        case '90':
          return 20
        case '180':
          return 30
        case '365':
          return 40
        case '1095':
          return 50
        case 'All':
          return 60
      }
    }
  }

  const generateOutput = useCallback(
    (value: number) => {
      if (health) {
        switch (value) {
          case 0:
            return { query: '1', display: '1 months' }
          case 10:
            return { query: '3', display: '3 months' }
          case 20:
            return { query: '6', display: '6 months' }
          case 30:
            return { query: '12', display: '1 years' }
          case 40:
            return { query: '18', display: '1.5 year' }
          case 50:
            return { query: '24', display: '2 years' }
          case 60:
            return { query: '36', display: '3 years' }
        }
      } else {
        switch (value) {
          case 0:
            return { query: '7', display: '7 days' }
          case 10:
            return { query: '30', display: '30 days' }
          case 20:
            return { query: '90', display: '90 days' }
          case 30:
            return { query: '180', display: '180 days' }
          case 40:
            return { query: '365', display: '1 year' }
          case 50:
            return { query: '1095', display: '3 years' }
          case 60:
            return { query: 'All', display: 'All' }
        }
      }
    },
    [current]
  )

  const submit = () => {
    setLastValue(current)
    onChange && onChange(generateOutput(current).query)
    optionChange && optionChange(currentOption)
    setFilterFormLeader && setFilterFormLeader(filterForm)
    setIsOpen(false)
  }

  const reset = () => {
    setCurrent(0)
    options && setCurrentOption(options[0].value)
    setHealthChartType && setHealthChartType('BMI')
    setFilterForm({
      country: {
        flag: '',
        name: '',
        alpha3Code: '',
        alpha2Code: '',
        region: '',
        phoneCode: '',
      },
      ageGroup: '',
      clubId: '',
      yourTeams: [''],
      role: '',
      category: '',
      contractedClub: {
        arena: '',
        city: '',
        clubId: '',
        clubName: '',
        country: '',
        logoUrl: '',
        nickName: '',
        websiteUrl: null,
      },
      teamId: '',
    })
  }

  useEffect(() => {
    setCurrent(generateInput(value))
    setLastValue(generateInput(value))
    setCurrentOption(option)
  }, [value, isOpen, option])

  const handleChangeForm = (type: keyof FilterForm, value: string) => {
    setFilterForm((prev) => ({ ...prev, [type]: value }))
  }

  const setSelectedClub = (value: ClubType) => {
    setFilterForm((prev) => ({
      ...prev,
      contractedClub: value,
      clubId: value.clubId,
      yourClub: value.clubName,
    }))
  }

  const setSelectedTeam = (value: string, index?: string) => {
    let newArr = [...(filterForm.yourTeams || [])]
    /* @ts-ignore */
    newArr[+index] = value.teamName
    setFilterForm((prev) => ({ ...prev, yourTeams: newArr }))
  }

  useEffect(() => {
    teamId && setFilterForm((prev) => ({ ...prev, teamId: teamId }))
  }, [teamId])

  return (
    <div className={clsx('flex w-full justify-end', className)}>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex items-center space-x-4"
      >
        {!health ? (
          <p className="text-[#09E099]">
            {lastValue !== 60 ? 'Last' : ''}{' '}
            {generateOutput(lastValue)?.display}
          </p>
        ) : null}
        {health ? (
          <p className="text-[#09E099]">
            {date.getFullYear()} - {healthType}{' '}
            {lastValue !== 60 ? 'Development last' : ''}{' '}
            {generateOutput(lastValue)?.display}
          </p>
        ) : null}
        <SvgFilter />
      </button>
      <ModalMui sx={{ width: 550 }} isOpen={isOpen} onClose={setIsOpen}>
        <div className="flex flex-col items-center space-y-4 p-2 relative">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-0"
          >
            <XIcon />
          </button>
          <span>
            <PeriodFilterIcon />
          </span>
          <p className="text-[24px] font-medium">{label}</p>
          <div className="w-full py-2">
            <MySlider
              label={`${current !== 60 ? 'Last:' : ''} ${
                generateOutput(current)?.display
              }`}
              isFilter
              step={10}
              max={60}
              value={current}
              onChange={(e) => setCurrent(e)}
              labelClass="text-[#A2A5AD]"
              health={health}
            />
          </div>
          {optionLabel && (
            <MyInput
              select
              className="py-3"
              value={currentOption}
              label={optionLabel}
              onChange={(_, e) => setCurrentOption(e.props.value)}
            >
              {options.map((option: { value: string; label: string }) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MyInput>
          )}

          <div className="w-full pb-[12px] space-y-[24px]">
            <MySelectCountry
              label="Country"
              value={filterForm.country}
              onChange={(_, value) => handleChangeForm('country', value)}
            />
            <MySelect
              label="Age of group"
              arrOption={AgeOfGroup}
              value={filterForm.ageGroup}
              onChange={(e) => handleChangeForm('ageGroup', e.target.value)}
            />
            <InfiniteScrollClub
              label="Club"
              value={filterForm.contractedClub}
              handleSetClub={setSelectedClub}
            />
            <InfiniteScrollTeam
              label="Team"
              /* @ts-ignore */
              handleSetTeam={(value) => setSelectedTeam(value, 0)}
              idClub={filterForm.contractedClub.clubId}
              setTeamId={setTeamId}
            />
            <MySelect
              label="Role"
              arrOption={RoleFilter}
              value={filterForm.role}
              onChange={(e) => handleChangeForm('role', e.target.value)}
            />
            <MySelect
              label="Category"
              arrOption={CategoryFilter}
              value={filterForm.category}
              onChange={(e) => handleChangeForm('category', e.target.value)}
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
      </ModalMui>
    </div>
  )
}
