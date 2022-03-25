import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MyInput } from 'src/components'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MySelect } from 'src/components/MySelect'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MyTextArea } from 'src/components/MyTextarea'
import { CountryType, FutureCareerType } from 'src/constants/types'
import {
  ClubType,
  CurrentTeamType,
} from 'src/constants/types/settingsType.type'
import { getNextYear, getToday } from 'src/hooks/functionCommon'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { InfiniteScrollClub } from 'src/module/account-settings/football/components/InfiniteScrollClub'
import { OptionPlayer } from 'src/module/authen/types'
import {
  createFutureCareer,
  getProfilePlayer,
} from 'src/service/biography-update'

interface FutureCareerProps {
  playerId?: string
}

type FormValuesType = Partial<{
  fromDate: string | Date
  toDate: string | Date
  country: CountryType
  league: string
  Club: string
  team: string
  role: string
  summary: string
  contractedClub: ClubType
  yourTeams: string[]
}>

const tagsClass =
  'text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]'

export const FutureCareer = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [team, setTeam] = useState<CurrentTeamType>({
    clubId: '',
    status: '',
    teamId: '',
    teamImage: '',
    teamName: '',
  })
  const [formValues, setFormValues] = useState<FormValuesType>({
    fromDate: getNextYear(1),
    toDate: getNextYear(2),
    country: {
      alpha2Code: '',
      alpha3Code: '',
      flag: '',
      name: '',
      phoneCode: '',
      region: '',
    },
    league: '',
    Club: '',
    team: '',
    role: '',
    summary: '',
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
    yourTeams: [''],
  })

  useEffect(() => {
    const getProfile = async () => {
      try {
        await getProfilePlayer().then((data) => {
          setFormValues((prev) => ({
            ...prev,
            country: data.data.profile.birthCountry,
            contractedClub: data.data.playerCareer.contractedClub,
            team: data.data.playerCareer.currentTeams[0].teamName,
            role: data.data.playerCareer.favoriteRoles[0],
          }))
        })
      } catch (error) {}
    }

    getProfile()
  }, [])

  const handleChangeForm = (type: keyof FormValuesType, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const setSelectedClub = (value: ClubType) => {
    setFormValues((prev) => ({
      ...prev,
      contractedClub: value,
      clubId: value.clubId,
      yourClub: value.clubName,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (formValues.fromDate > formValues.toDate) {
      toast.error('Your From(date) can not bigger than To(date)')
      setTimeout(() => {
        setLoading(false)
      }, 500)
      return
    }
    const valueFutureCareers: FutureCareerType = {
      fromTime: formValues.fromDate as string,
      toTime: formValues.toDate as string,
      country: formValues.country,
      league: {
        name: formValues.league,
      },
      clubId: formValues.contractedClub.clubId,
      team: {
        teamName: formValues.team,
        clubId: formValues.contractedClub.clubId,
      },
      role: formValues.role,
      motivation: formValues.summary,
    }

    try {
      await createFutureCareer(valueFutureCareers).then((data) => {
        if (data.status === 201) {
          setLoading(false)
          window.scroll(0, 0)
          toast.success(data.data)
        }
      })
    } catch (error) {}

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-5">
      <BackGround
        label="Future Career"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-12 ">
          <div className="space-y-7">
            <div className="flex">
              <div className="flex-1 mr-[10px]">
                <MyDatePicker
                  label="From"
                  onChange={(e) => handleChangeForm('fromDate', e)}
                  value={formValues.fromDate}
                />
              </div>
              <div className="flex-1 ml-[10px]">
                <MyDatePicker
                  label="To"
                  onChange={(e) => handleChangeForm('toDate', e)}
                  value={formValues.toDate}
                />
              </div>
            </div>

            <MySelectCountry
              label="Country"
              onChange={(_, value) => handleChangeForm('country', value)}
              value={formValues.country}
            />

            <MyInput
              label="League"
              value={formValues.league}
              onChange={(e) => handleChangeForm('league', e.target.value)}
            />

            <InfiniteScrollClub
              label="Club"
              value={formValues.contractedClub}
              handleSetClub={setSelectedClub}
            />

            <MyInput
              label="Team"
              value={formValues.team}
              onChange={(e) => handleChangeForm('team', e.target.value)}
            />

            <MySelect
              label="Role"
              arrOption={OptionPlayer}
              onChange={(e) => handleChangeForm('role', e.target.value)}
              value={formValues.role}
            />

            <MyTextArea
              placeholder="Write a short summary of your time at this Club"
              onChange={(e) => handleChangeForm('summary', e.target.value)}
              value={formValues.summary}
            />
          </div>
        </div>
      </BackGround>
      <MyButton
        onClick={handleSubmit}
        isLoading={loading}
        type="submit"
        label="Save"
        className="mt-[24px] mb-[181px]"
      />
    </div>
  )
}
