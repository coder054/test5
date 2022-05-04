import { useAtom } from 'jotai'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MinusIcon, PlusIcon } from 'src/components/icons'
import { MyButton } from 'src/components/MyButton'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MyInput } from 'src/components/MyInput'
import { POSITION } from 'src/constants/mocks/position.constants'
import { QUERIES_SETTINGS } from 'src/constants/query-keys/query-keys.constants'
import {
  ClubType,
  CurrentTeamType,
  PlayerCareerType,
} from 'src/constants/types/settingsType.type'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { updateSettings } from 'src/service/users/settings.service'
import { BackGround } from '../common-components/Background'
import { InfiniteScrollClub } from './components/InfiniteScrollClub'
import { InfiniteScrollTeam } from './components/InfiniteScrollTeam'

type FormArrayType = {
  currentTeams?: CurrentTeamType[]
  teamCalendarLinks: string[]
  favoriteRoles: string[]
}

export const FootballPlayer = () => {
  const queryClient = useQueryClient()
  const { currentRoleName } = useAuth()
  const [account] = useAtom(settingsAtom)
  const [formValues, setFormValues] = useState<PlayerCareerType>({
    teamCalendarLinks: [],
    favoriteRoles: [],
    currentTeams: [],
    seasonEndDate: '',
    seasonStartDate: '',
    contractedFrom: '',
    contractedUntil: '',
    shirtNumber: null,
    contractedClub: {
      arena: '',
      city: '',
      clubId: '',
      clubName: '',
      country: '',
      logoUrl: '',
      websiteUrl: null,
    },
  })

  const setSelectedClub = (value: ClubType) => {
    setFormValues((prev) => ({
      ...prev,
      contractedClub: value,
      clubId: value.clubId,
    }))
  }

  const setSelectedTeam = (value: CurrentTeamType, index?: string) => {
    let newArr = [...(formValues.currentTeams || [])]
    newArr[+index] = value
    setFormValues((prev) => ({ ...prev, currentTeams: newArr }))
  }

  const handleChangeForm = useCallback(
    (type: keyof PlayerCareerType, value: string, index?: string) => {
      /* @ts-ignore */
      let newArr = [...(formValues[type] || [])]
      newArr[+index] = value
      setFormValues((prev) => ({ ...prev, [type]: index ? newArr : value }))
    },
    [JSON.stringify(formValues)]
  )

  const handleAddForm = useCallback(
    (type: keyof FormArrayType, initialValue: any) => {
      if (formValues[type].length <= 10) {
        let arr = [...formValues[type]]
        arr.push(initialValue)
        setFormValues((prev) => ({ ...prev, [type]: arr }))
      }
    },
    [JSON.stringify(formValues)]
  )

  const handleRemoveForm = useCallback(
    (type: keyof FormArrayType, i: number) => {
      /* @ts-ignore */
      const arr = formValues[type].filter((_, index: number) => {
        return [i].indexOf(index) == -1
      })
      setFormValues((prev) => ({ ...prev, [type]: arr }))
    },
    [JSON.stringify(formValues)]
  )

  const { mutate: mutateUpdate, isLoading } = useMutation(updateSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_SETTINGS.SETTINGS)
      toast.success('Successfully updated')
    },
    onError: () => {
      toast.error("Can't leave. Please assigned owner to others")
    },
  })

  const handleSubmit = () => {
    mutateUpdate({
      data: { playerCareer: formValues },
      currentRoleName: currentRoleName,
    })
  }

  useEffect(() => {
    account &&
      setFormValues({
        ...account.playerCareer,
        currentTeams:
          account.playerCareer?.currentTeams?.length === 0
            ? [
                {
                  clubId: '',
                  status: '',
                  teamId: '',
                  teamImage: '',
                  teamName: '',
                },
              ]
            : account.playerCareer?.currentTeams,
        favoriteRoles:
          account.playerCareer?.favoriteRoles?.length === 0
            ? ['']
            : account.playerCareer?.favoriteRoles,
        teamCalendarLinks:
          account.playerCareer?.teamCalendarLinks?.length === 0
            ? ['']
            : account.playerCareer?.teamCalendarLinks,
      })
  }, [account])

  return (
    <div className="space-y-6">
      <BackGround label="Football" contentClass="xl:w-[400px]">
        <div className="space-y-7">
          <InfiniteScrollClub
            label="Your Club"
            value={formValues.contractedClub}
            handleSetClub={setSelectedClub}
          />
          {(formValues.currentTeams || []).map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <InfiniteScrollTeam
                label="Your team(s)"
                idClub={formValues.contractedClub.clubId}
                handleSetTeam={(value) => setSelectedTeam(value, index + '')}
                item={item}
              />
              {index === 0 && (
                <span
                  onClick={() =>
                    handleAddForm('currentTeams', {
                      clubId: '',
                      status: '',
                      teamId: '',
                      teamImage: '',
                      teamName: '',
                    })
                  }
                  className="cursor-pointer"
                >
                  <PlusIcon />
                </span>
              )}
              {index !== 0 && (
                <span
                  onClick={() => handleRemoveForm('currentTeams', index)}
                  className="cursor-pointer"
                >
                  <MinusIcon />
                </span>
              )}
            </div>
          ))}
          {(formValues.teamCalendarLinks || []).map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <MyInput
                className="w-full"
                value={item}
                key={index}
                label="Your Team(s) web calendar link"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeForm(
                    'teamCalendarLinks',
                    e.target.value,
                    index + ''
                  )
                }
              />
              {index === 0 && (
                <span
                  onClick={() => handleAddForm('teamCalendarLinks', '')}
                  className="cursor-pointer"
                >
                  <PlusIcon />
                </span>
              )}
              {index !== 0 && (
                <span
                  onClick={() => handleRemoveForm('teamCalendarLinks', index)}
                  className="cursor-pointer"
                >
                  <MinusIcon />
                </span>
              )}
            </div>
          ))}
          <MyInput
            label="Shirtnumber"
            value={formValues.shirtNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('shirtNumber', e.target.value)
            }
          />
          {(formValues.favoriteRoles || []).map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <MyCustomSelect
                className="w-full"
                arrOptions={POSITION}
                key={index}
                label="Roles"
                onChange={(_, value) =>
                  handleChangeForm('favoriteRoles', value, index + '')
                }
                val={item}
              />
              {index === 0 && (
                <span
                  onClick={() => handleAddForm('favoriteRoles', '')}
                  className="cursor-pointer"
                >
                  <PlusIcon />
                </span>
              )}
              {index !== 0 && (
                <span
                  onClick={() => handleRemoveForm('favoriteRoles', index)}
                  className="cursor-pointer"
                >
                  <MinusIcon />
                </span>
              )}
            </div>
          ))}
          <MyDatePicker
            onChange={(e) => handleChangeForm('seasonStartDate', e)}
            value={formValues.seasonStartDate}
            label="Season start date"
          />
          <MyDatePicker
            onChange={(e) => handleChangeForm('seasonEndDate', e)}
            value={formValues.seasonEndDate}
            label="Season end date"
          />
          <MyDatePicker
            onChange={(e) => handleChangeForm('contractedFrom', e)}
            value={formValues.contractedFrom}
            label="Contracted from"
          />
          <MyDatePicker
            onChange={(e) => handleChangeForm('contractedUntil', e)}
            value={formValues.contractedUntil}
            label="Contracted until"
          />
        </div>
      </BackGround>
      <MyButton
        onClick={handleSubmit}
        isLoading={isLoading}
        type="submit"
        label="Save"
      />
    </div>
  )
}
