import { Button } from 'src/components'
import { MyInput } from 'src/components/MyInput'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GoBack } from 'src/components/go-back'
import { MySelect } from 'src/components/MySelect'
import { OptionCoach, OptionPlayer } from '../types'
import { DynamicFields } from 'src/components/dynamic-fields'
import { useIncrementNumber } from 'src/hooks/useIncrementNumber'
import { MyModal } from 'src/components/MyModal'
import { ROUTES } from 'src/constants/constants'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { InfiniteScrollClub } from 'src/module/account-settings/components/football/components/InfiniteScrollClub'
import {
  ClubType,
  CurrentTeamType,
  PlayerCareerType,
} from 'src/constants/types/settingsType.type'
import { InfiniteScrollTeam } from 'src/module/account-settings/components/football/components/InfiniteScrollTeam'
import { MinusIcon, PlusIcon } from 'src/components/icons'
import { useAtom } from 'jotai'
import { profileAtom } from 'src/atoms/profileAtom'

type FormArrayType = Partial<{
  favoriteRoles: string[]
  yourTeams: CurrentTeamType[]
}>

type FormValueType = Partial<{
  yourClub: string
  currentTeams: CurrentTeamType[]
  yourTeams: string[]
  shirtNumber: string
  favoriteRoles: string[]
  length: string
  weight: string
  contractedClub: ClubType
}>

const COMMON_CLASS =
  'active:border-2 active:border-[#6B7280] border-2 border-[#202128cc] rounded-full duration-150 cursor-pointer'

export const SignUpFormPlayer = () => {
  const [profileForm, setProfileForm] = useAtom(profileAtom)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { profile, values } = router.query
  // console.log('profileForm', profileForm)

  const [formValues, setFormValues] = useState<FormValueType>({
    yourClub: '',
    currentTeams: [],
    yourTeams: [''],
    shirtNumber: '',
    favoriteRoles: [''],
    length: '',
    weight: '',
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

  const shirtNumber = useIncrementNumber({
    startNumber: 1,
    endNumber: 99,
  })

  const lengthNumber = useIncrementNumber({
    startNumber: 120,
    endNumber: 220,
    meanSure: 'cm',
  })

  const weightNumber = useIncrementNumber({
    startNumber: 30,
    endNumber: 130,
    meanSure: 'kg',
  })

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

  React.useEffect(() => {
    if (!profileForm.profile?.firstName) {
      router.push(ROUTES.SIGNUP_FORM)
    }
  }, [profileForm])

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
      /* @ts-ignore */

      // console.log('value', value.teamName)
      if (type === 'favoriteRoles') {
        /* @ts-ignore */
        newArr[+index] = value.key
      } else if (type === 'yourTeams') {
        /* @ts-ignore */
        newArr[+index] = value.teamName
      }
      setFormValues((prev) => ({ ...prev, [type]: index ? newArr : value }))
    },
    [formValues]
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log('form', formValues)
    setProfileForm({
      ...profileForm,
      playerCareer: {
        clubId: formValues.contractedClub.clubId,
        contractedFrom: '',
        contractedUntil: '',
        acceptedTeamIds: formValues.yourTeams,
        pendingTeamIds: [],
        favoriteRoles: formValues.favoriteRoles,
        shirtNumber: +formValues.shirtNumber,
        summary: '',
        teamCalendarLinks: [],
        seasonStartDate: '',
        seasonEndDate: '',
        estMarketValue: 0,
      },
      health: {
        height: {
          value: +formValues.length,
          updatedAt: '',
        },
        weight: {
          value: +formValues.weight,
          updatedAt: '',
        },
        leftFootLength: 0,
        rightFootLength: 0,
      },
    })

    router.push(ROUTES.SIGNUP_FORM_PLAYER_SKILLS)
  }

  // console.log('values', JSON.parse(values as any))

  return (
    <div className="autofill2 w-screen min-h-screen lg:flex md:items-center">
      <div className="absolute top-[16px] lg:top-[40px] md:left-[40px]">
        <GoBack label="Sign up form" goBack={ROUTES.SIGNUP_FORM} />
      </div>
      <div
        className={`w-[320px] md:w-[500px] md:h-[880px] rounded-[8px] pt-[48px] pb-[48px] lg:right-[5%] xl:right-[10%] 2xl:right-[25%] overflow-y-auto 
        pl-[5px] pr-[5px] mx-auto lg:mr-0 lg:absolute`}
      >
        <p className="text-[24px] text-[#FFFFFF] font-semibold text-center md:text-left mb-[48px]">
          Sign up form - player
        </p>

        <div className="w-[470px]">
          <InfiniteScrollClub
            initialValue={formValues.contractedClub}
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
          signupForm
          className="mt-[24px] w-[470px]"
          label={'Shirtnumber'}
          value={formValues.shirtNumber}
          onChange={(e) => {
            handleChangeForm('shirtNumber', e.target.value)
          }}
          arrOption={shirtNumber}
        />
        {(formValues.favoriteRoles || []).map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <MySelect
              className="w-[270px] md:w-[430px] mt-[24px]"
              label={'Favorite Role(s)'}
              onChange={(_, value) => {
                handleChangeForm('favoriteRoles', value, index + '')
              }}
              val={item}
              arrOption={OptionPlayer}
            />
            {index === 0 && (
              <span
                onClick={() => handleAddForm('favoriteRoles', '')}
                className={`${COMMON_CLASS} mt-[24px]`}
              >
                <PlusIcon />
              </span>
            )}
            {index !== 0 && (
              <span
                onClick={() => handleRemoveForm('favoriteRoles', index)}
                className={`${COMMON_CLASS} mt-[24px]`}
              >
                <MinusIcon />
              </span>
            )}
          </div>
        ))}

        {lengthNumber && (
          <MySelect
            signupForm
            className="mt-[24px] w-[470px]"
            label={'length'}
            value={formValues.length}
            onChange={(e) => {
              handleChangeForm('length', e.target.value)
            }}
            arrOption={lengthNumber}
          />
        )}

        <MySelect
          signupForm
          className="mt-[24px] w-[470px]"
          label={'weight'}
          value={formValues.weight}
          onChange={(e) => {
            handleChangeForm('weight', e.target.value)
          }}
          arrOption={weightNumber}
        />

        <div className="mt-[40px]" onClick={handleSubmit}>
          <Button
            loading={loading}
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
