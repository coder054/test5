import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { profileCoachAtom } from 'src/atoms/profileCoachAtom'
import { Button } from 'src/components'
import { GoBack } from 'src/components/go-back'
import { MinusIcon, PlusIcon } from 'src/components/icons'
import { MyInput } from 'src/components/MyInput'
import { MyModal } from 'src/components/MyModal'
import { MySelect } from 'src/components/MySelect'
import { ROUTES } from 'src/constants/constants'
import {
  CoachingStyle,
  CoachingType,
  ExperienceLevel,
  HighestCoachingEducation,
} from 'src/constants/options'
import {
  ClubType,
  CurrentTeamType,
} from 'src/constants/types/settingsType.type'
import { InfiniteScrollClub } from 'src/module/account-settings/football/components/InfiniteScrollClub'
import { InfiniteScrollTeam } from 'src/module/account-settings/football/components/InfiniteScrollTeam'

import { useAuth } from '../auth/AuthContext'
import { OptionCoach } from '../types'

type FormArrayType = Partial<{
  yourTeams: CurrentTeamType[]
}>

type FormValueType = Partial<{
  yourClub: string
  // currentTeams: CurrentTeamType[]
  yourTeams: string[]
  favoriteRole: string
  highestCoachingEducation: string
  experienceLevel: string
  coachingStyle: string
  coachingType: string
  contractedClub: ClubType
}>

const COMMON_CLASS =
  'active:border-2 active:border-[#6B7280] border-2 border-[#202128cc] rounded-full duration-150 cursor-pointer'

export const SignUpFormCoach = () => {
  const [profileCoachForm, setProfileCoachForm] = useAtom(profileCoachAtom)

  const router = useRouter()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { signin } = useAuth()
  const { profile } = router.query

  console.log('profileCoachForm', profileCoachForm)

  const [formValues, setFormValues] = useState<FormValueType>({
    yourClub: '',
    yourTeams: [''],
    favoriteRole: '',
    highestCoachingEducation: '',
    experienceLevel: '',
    coachingStyle: '',
    coachingType: '',
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
  })

  React.useEffect(() => {
    if (!profileCoachForm.profile?.firstName) {
      router.push(ROUTES.SIGNUP_FORM)
    }
  }, [profileCoachForm])

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let el = window.document.querySelector('.ant-form')
    if (!el) {
      return
    }

    el.classList.remove('ant-form')
  }, [])

  const setSelectedClub = (value: ClubType) => {
    setFormValues((prev) => ({
      ...prev,
      contractedClub: value,
      clubId: value.clubId,
      yourClub: value.clubName,
    }))
  }

  const setSelectedTeam = (value: string, index?: string) => {
    let newArr = [...(formValues.yourTeams || [])]
    /* @ts-ignore */
    newArr[+index] = value.teamName
    setFormValues((prev) => ({ ...prev, yourTeams: newArr }))
  }

  const handleAddForm = useCallback(
    (type: keyof FormArrayType, initialValue: any) => {
      if (formValues[type].length < 3) {
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

  const handleChangeForm = useCallback(
    (type: keyof FormValueType, value: string, index?: string) => {
      /* @ts-ignore */
      let newArr = [...(formValues[type] || [])]
      if (type === 'yourTeams') {
        /* @ts-ignore */
        newArr[+index] = value.teamName
      } else {
        newArr[+index] = value
      }

      setFormValues((prev) => ({ ...prev, [type]: index ? newArr : value }))
    },
    [formValues]
  )
  const handleSubmit = async (event) => {
    event.preventDefault()

    setProfileCoachForm({
      ...profileCoachForm,
      coachCareer: {
        clubId: formValues.contractedClub.clubId,
        contractedFrom: '',
        contractedUntil: '',
        seasonStartDate: '',
        seasonEndDate: '',
        acceptedTeamIds: formValues.yourTeams,
        pendingTeamIds: [],
        role: formValues.favoriteRole,
        highestCoachingEducation: formValues.highestCoachingEducation,
        expLevel: formValues.experienceLevel,
        managementStyle: formValues.coachingStyle,
        managementType: formValues.coachingType,
        summary: '',
      },
    })

    router.push({
      pathname: ROUTES.SIGNUP_FORM_COACH_SKILLS,
      query: { profile: profile },
    })
  }

  return (
    <div className="autofill2 w-screen min-h-screen lg:flex md:items-center">
      <div className="absolute top-[16px] lg:top-[40px] left-[149px] md:left-[40px]]">
        <GoBack label="Sign up form" goBack={ROUTES.SIGNUP_FORM} />
      </div>
      <div
        className={`w-[320px] md:w-[500px] md:h-[880px] rounded-[8px] pt-[48px] pb-[48px] lg:right-[5%] xl:right-[10%] 2xl:right-[25%] overflow-y-auto 
        pl-[5px] pr-[5px] mx-auto lg:mr-0 lg:absolute`}
      >
        <p className="text-[24px] text-[#FFFFFF] font-semibold text-center md:text-left">
          Sign up form - coach
        </p>
        <div className="w-[470px] mt-[48px]">
          <InfiniteScrollClub
            label="Your club"
            value={formValues.contractedClub}
            handleSetClub={setSelectedClub}
          />
        </div>

        {(formValues.yourTeams || []).map((item, index) => (
          <div key={index} className="flex items-center mt-[24px] w-[470px]">
            <div className="w-[430px]">
              <InfiniteScrollTeam
                idClub={formValues.contractedClub.clubId}
                /* @ts-ignore */
                handleSetTeam={(value) => setSelectedTeam(value, index + '')}
                /* @ts-ignore */
                item={item}
              />
            </div>
            {index === 0 && (
              <span
                onClick={() => handleAddForm('yourTeams', '')}
                className={`${COMMON_CLASS} ml-[12px]`}
              >
                <PlusIcon />
              </span>
            )}
            {index !== 0 && (
              <span
                onClick={() => handleRemoveForm('yourTeams', index)}
                className={`${COMMON_CLASS} ml-[12px]`}
              >
                <MinusIcon />
              </span>
            )}
          </div>
        ))}

        <MySelect
          className=" w-[470px] mt-[24px]"
          label={'Role'}
          onChange={(e) => {
            handleChangeForm('favoriteRole', e.target.value)
          }}
          arrOption={OptionCoach}
        />

        <MySelect
          signupForm
          className=" w-[470px] mt-[24px]"
          label={'Highest Coaching Education'}
          onChange={(e) => {
            handleChangeForm('highestCoachingEducation', e.target.value)
          }}
          arrOption={HighestCoachingEducation}
        />

        <MySelect
          signupForm
          className=" w-[470px] mt-[24px]"
          label={'Experience Level'}
          onChange={(e) => {
            handleChangeForm('experienceLevel', e.target.value)
          }}
          arrOption={ExperienceLevel}
        />

        <MySelect
          signupForm
          className=" w-[470px] mt-[24px]"
          label={'Coaching Style'}
          onChange={(e) => {
            handleChangeForm('coachingStyle', e.target.value)
          }}
          arrOption={CoachingStyle}
        />

        <MySelect
          signupForm
          className=" w-[470px] mt-[24px]"
          label={'Coaching Type'}
          onChange={(e) => {
            handleChangeForm('coachingType', e.target.value)
          }}
          arrOption={CoachingType}
        />

        <div className="mt-[40px]" onClick={handleSubmit}>
          <Button
            // loading={loading}
            className="h-[48px] w-[310px] md:w-[470px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3] absolute"
            text="Next"
          />
        </div>
      </div>
      <MyModal show={openModal} setShow={setOpenModal} width={412}>
        <div className="w-[300px] md:w-[412px] mx-auto h-full bg-[#1E1F24] rounded-[8px] p-[16px] md:p-[32px]">
          <div>
            <div
              onClick={() => {
                setOpenModal(false)
              }}
              className="h-[32px] flex items-center"
            >
              <GoBack />
              <p className="text-[24px] text-[#FFFFFF] ml-[48px]">
                Add new club
              </p>
            </div>
          </div>
          <MyInput label="Club name" className="mt-[24px]" />
          <MyInput label="Team name" className="mt-[24px]" />
          <MyInput label="Club website url" className="mt-[24px]" />
          <MyInput label="Favorite Role(s)" className="mt-[24px]" />
          <MyInput label="Country" className="mt-[24px]" />
          <MyInput label="City" className="mt-[24px]" />
          <Button
            text="Save"
            className="h-[48px] mt-[40px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
          />
        </div>
      </MyModal>
    </div>
  )
}
