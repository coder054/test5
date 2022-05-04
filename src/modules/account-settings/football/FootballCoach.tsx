import { MenuItem, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MyInputChips } from 'src/components'
import { MinusIcon, PlusIcon } from 'src/components/icons'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MyInput } from 'src/components/MyInput'
import { MyTextArea } from 'src/components/MyTextarea'
import {
  COACHING_EDUCATION,
  EXPERIENCE_LEVEL,
  COACHING_STYLE,
  COACHING_TYPE,
} from 'src/constants/mocks/common.constants'
import { QUERIES_SETTINGS } from 'src/constants/query-keys/query-keys.constants'
import {
  ClubType,
  CoachCareerType,
  CurrentTeamType,
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

export default function FootballCoach() {
  const queryClient = useQueryClient()
  const { currentRoleName } = useAuth()
  const [account] = useAtom(settingsAtom)
  const [tags, setTags] = useState<string[]>([])
  const [formValues, setFormValues] = useState<CoachCareerType>({
    clubId: '',
    contractedFrom: '',
    contractedUntil: '',
    currentTeams: [],
    expLevel: '',
    highestCoachingEducation: '',
    managementStyle: '',
    managementType: '',
    role: '',
    summary: '',
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
    (type: keyof CoachCareerType, value: string, index?: string) => {
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
      data: {
        coachCareer: formValues,
        coachSkills: { ...account.coachSkills, specialityTags: tags },
      },
      currentRoleName: currentRoleName,
    })
  }

  useEffect(() => {
    account.coachSkills?.specialityTags &&
      setTags(account.coachSkills?.specialityTags)
    setFormValues({
      ...account.coachCareer,
      currentTeams:
        account.coachCareer?.currentTeams.length === 0
          ? [
              {
                clubId: '',
                status: '',
                teamId: '',
                teamImage: '',
                teamName: '',
              },
            ]
          : account.coachCareer?.currentTeams,
    })
  }, [JSON.stringify(account)])

  return (
    <div className="space-y-6">
      <BackGround label="Football" contentClass="xl:w-[400px]">
        <div className="space-y-7">
          <InfiniteScrollClub
            label="Club"
            value={formValues.contractedClub}
            handleSetClub={setSelectedClub}
          />
          {(formValues.currentTeams || []).map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <InfiniteScrollTeam
                label="Your team(s) name"
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
          <MyInput
            label="Role"
            value={formValues.role}
            onChange={(e) => handleChangeForm('role', e.target.value)}
          />
          <MyInput
            select
            label="Highest Coaching Education"
            value={formValues.highestCoachingEducation}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('highestCoachingEducation', event.target.value)
            }
          >
            {COACHING_EDUCATION.map((it: string) => (
              <MenuItem key={it} value={it}>
                {it}
              </MenuItem>
            ))}
          </MyInput>
          <MyInput
            select
            label="Experience Level"
            value={formValues.expLevel}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('expLevel', event.target.value)
            }
          >
            {EXPERIENCE_LEVEL.map((it: string) => (
              <MenuItem key={it} value={it}>
                {it}
              </MenuItem>
            ))}
          </MyInput>
          <MyInput
            select
            label="Coaching Style"
            value={formValues.managementStyle}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('managementStyle', event.target.value)
            }
          >
            {COACHING_STYLE.map((it: string) => (
              <MenuItem key={it} value={it}>
                {it}
              </MenuItem>
            ))}
          </MyInput>
          <MyInput
            select
            label="Coaching Type"
            value={formValues.managementType}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('managementType', event.target.value)
            }
          >
            {COACHING_TYPE.map((it: string) => (
              <MenuItem key={it} value={it}>
                {it}
              </MenuItem>
            ))}
          </MyInput>
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
          <MyTextArea
            label="Summary"
            value={formValues.summary}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('summary', e.target.value)
            }
          />
          <MyInputChips
            label="Speciality tags"
            value={tags}
            setTags={setTags}
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
