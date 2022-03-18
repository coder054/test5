import { useCallback, useState, useEffect } from 'react'
import { MinusIcon, PlusIcon } from 'src/components/icons'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MyInput } from 'src/components/MyInput'
import { POSITION } from 'src/constants/mocks/position.constants'
import {
  ClubType,
  CurrentTeamType,
  PlayerCareerType,
  TeamType,
} from 'src/constants/types/settingsType.type'
import { BackGround } from '../common-components/Background'
import { InfiniteScrollClub } from './components/InfiniteScrollClub'
import { useAtom } from 'jotai'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MyButton } from 'src/components/MyButton'
import { InfiniteScrollTeam } from './components/InfiniteScrollTeam'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { notification } from 'antd'
import toast from 'react-hot-toast'

type FormArrayType = {
  currentTeams?: CurrentTeamType[]
  teamCalendarLinks: string[]
  favoriteRoles: string[]
}

const COMMON_CLASS =
  'active:border-2 active:border-[#6B7280] border-2 border-[#202128cc] rounded-full duration-150 cursor-pointer'

export const Football = () => {
  const [account, setAccount] = useAtom(settingsAtom)
  const { currentRoleId, currentRoleName } = useAuth()
  console.log(account)

  const [isLoading, setIsLoading] = useState<boolean>(false)
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
    [formValues]
  )

  const handleAddForm = useCallback(
    (type: keyof FormArrayType, initialValue: any) => {
      if (formValues[type].length <= 10) {
        let arr = [...formValues[type]]
        arr.push(initialValue)
        setFormValues((prev) => ({ ...prev, [type]: arr }))
      }
    },
    [formValues]
  )

  const handleRemoveForm = useCallback(
    (type: keyof FormArrayType, i: number) => {
      /* @ts-ignore */
      const arr = formValues[type].filter((_, index) => {
        return [i].indexOf(index) == -1
      })
      setFormValues((prev) => ({ ...prev, [type]: arr }))
    },
    [formValues]
  )

  const handleSubmit = async () => {
    setIsLoading(true)
    await axios
      .patch(`users/${currentRoleName}/settings`, {
        playerCareer: formValues,
      })
      .then(() => {
        setAccount({ ...account, playerCareer: formValues })
        setIsLoading(false)
        toast.success('Successfully updated')
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('An error has occurred')
      })
  }

  useEffect(() => {
    account &&
      setFormValues({
        ...account.playerCareer,
        favoriteRoles:
          account.playerCareer?.favoriteRoles.length === 0
            ? ['']
            : account.playerCareer?.favoriteRoles,
        teamCalendarLinks:
          account.playerCareer?.teamCalendarLinks.length === 0
            ? ['']
            : account.playerCareer?.teamCalendarLinks,
      })
  }, [account])

  return (
    <div className="space-y-6">
      <BackGround label="Football" contentClass="xl:w-[400px]">
        <div className="space-y-7">
          <InfiniteScrollClub
            initialValue={formValues.contractedClub}
            handleSetClub={setSelectedClub}
          />
          {(formValues.currentTeams || []).map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <InfiniteScrollTeam
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
                  className={COMMON_CLASS}
                >
                  <PlusIcon />
                </span>
              )}
              {index !== 0 && (
                <span
                  onClick={() => handleRemoveForm('currentTeams', index)}
                  className={COMMON_CLASS}
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
                onChange={(e) =>
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
                  className={COMMON_CLASS}
                >
                  <PlusIcon />
                </span>
              )}
              {index !== 0 && (
                <span
                  onClick={() => handleRemoveForm('teamCalendarLinks', index)}
                  className={COMMON_CLASS}
                >
                  <MinusIcon />
                </span>
              )}
            </div>
          ))}
          <MyInput
            label="Shirtnumber"
            value={formValues.shirtNumber}
            onChange={(e) => handleChangeForm('shirtNumber', e.target.value)}
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
                  className={COMMON_CLASS}
                >
                  <PlusIcon />
                </span>
              )}
              {index !== 0 && (
                <span
                  onClick={() => handleRemoveForm('favoriteRoles', index)}
                  className={COMMON_CLASS}
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
