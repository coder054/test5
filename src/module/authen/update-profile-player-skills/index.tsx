import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, MyInputChips } from 'src/components'
import { Comments } from 'src/components/Comments'
const cls = require('./update-profile-player-skills.module.css')
import { GoBack } from 'src/components/go-back'
import { ItemSkills } from 'src/components/item-skills'
import { Input } from 'antd'
import { useAtom } from 'jotai'
import { profileAtom } from 'src/atoms/profileAtom'
import { ROUTES } from 'src/constants/constants'
import { useRouter } from 'next/router'
import { axios } from 'src/utils/axios'
import { MySlider } from 'src/components/MySlider'
import _ from 'lodash'
import { API_UPDATE_PROFILE_PLAYER } from 'src/constants/api.constants'
import { getErrorMessage } from 'src/utils/utils'
import toast from 'react-hot-toast'

interface FootBallSkillType {
  technics: number
  tactics: number
  physics: number
  mental: number
}
interface RadarChartType {
  attacking: number
  dribbling: number
  passing: number
  defending: number
  pace: number
  shooting: number
}

export const SignUpFormPlayerSkills = () => {
  const [profileForm, setProfileForm] = useAtom(profileAtom)
  const { TextArea } = Input
  const router = useRouter()
  const date = new Date()
  const { profile } = router.query

  const [footBallSkills, setFootBallSkills] = useState<FootBallSkillType>({
    technics: 0,
    tactics: 0,
    physics: 0,
    mental: 0,
  })

  const [radarCharts, setRadarCharts] = useState<RadarChartType>({
    attacking: 0,
    dribbling: 0,
    passing: 0,
    defending: 0,
    pace: 0,
    shooting: 0,
  })

  const [note, setNote] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

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
      router.push(ROUTES.UPDATE_PROFILE)
    }
  }, [profileForm])

  const handleChangeSkills = (type: keyof FootBallSkillType, value: string) => {
    setFootBallSkills((prev) => ({ ...prev, [type]: value }))
  }

  const handleChangeRadar = (type: keyof RadarChartType, value: string) => {
    setRadarCharts((prev) => ({ ...prev, [type]: value }))
  }

  const handleNext = async (e: any) => {
    e.preventDefault()

    const profilePlayer = {
      health: {
        height: {
          value: profileForm?.health?.height?.value,
          updatedAt: date.toISOString(),
        },
        weight: {
          value: profileForm?.health?.weight?.value,
          updatedAt: date.toISOString(),
        },
        leftFootLength: 0,
        rightFootLength: 0,
      },
      media: {
        faceImage: profileForm?.media?.faceImage,
        bodyImage: profileForm?.media?.bodyImage,
        teamImage: '',
        videoLinks: [],
      },
      profile: {
        phone: '',
        firstName: profileForm?.profile?.firstName,
        lastName: profileForm?.profile?.lastName,
        gender: 'MALE',
        birthCountry: profileForm?.profile?.birthCountry,
        birthDay: profileForm?.profile?.birthDay,
        homeAddress: '',
        postNumber: '',
        region: '',
        city: profileForm?.profile?.city,
      },
      settings: {
        country: profileForm?.profile?.birthCountry,
        language: '',
        public: true,
        notificationOn: true,
        notificationOptions: {
          profileAndDiaryUpdates: true,
          feedUpdates: true,
          messageUpdates: true,
          inviteUpdates: true,
        },
      },
      socialLinks: {
        instagram: '',
        facebook: '',
        twitter: '',
        youtube: '',
        veoHighlites: '',
        tiktok: '',
      },
      playerCareer: {
        clubId: profileForm?.playerCareer?.clubId,
        contractedFrom: date.toISOString(),
        contractedUntil: date.toISOString(),
        acceptedTeamIds: profileForm?.playerCareer?.acceptedTeamIds,
        pendingTeamIds: [],
        favoriteRoles: profileForm?.playerCareer?.favoriteRoles,
        shirtNumber: profileForm?.playerCareer?.shirtNumber,
        summary: note,
        teamCalendarLinks: [],
        seasonStartDate: date.toISOString(),
        seasonEndDate: date.toISOString(),
        estMarketValue: 0,
      },
      playerSkills: {
        specialityTags: tags,
        overall: {
          mental: footBallSkills.mental / 20,
          physics: footBallSkills.physics / 20,
          tactics: footBallSkills.tactics / 20,
          technics: footBallSkills.technics / 20,
          leftFoot: 0,
          rightFoot: 0,
        },
        radar: {
          attacking: radarCharts.attacking,
          defending: radarCharts.defending,
          dribbling: radarCharts.dribbling,
          passing: radarCharts.passing,
          shooting: radarCharts.shooting,
          pace: radarCharts.pace,
          tackling: 0,
          heading: 0,
        },
      },
    }

    try {
      const response = await axios.put(API_UPDATE_PROFILE_PLAYER, {
        ...profilePlayer,
        roleId: uuidv4(),
      })

      if (response.status === 200) {
        router.push({
          pathname: ROUTES.UPDATE_PROFILE_BIOGRAPHY,
          query: { profile: profile },
        })
      }
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <div className="autofill2 w-screen min-h-screen float-left lg:flex md:items-center">
      <div className="absolute top-[16px] lg:top-[40px] md:left-[40px] z-20">
        <GoBack
          textBlack
          label="Update your profile"
          goBack={ROUTES.UPDATE_PROFILE_PLAYER}
        />
      </div>

      <div className="absolute z-20 w-full bottom-12">
        <div className="mx-auto w-11/12 md:w-5/6 lg:w-2/3 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
          <ItemSkills className="w-[372px] h-[513px]">
            <>
              <p className="text-[24px] text-[#FFFFFF] mb-[48px]">
                Update your profile - player skills
              </p>
              <Comments
                listComment={[
                  {
                    img: '/avt-nick.svg',
                    text: 'Honestly now, how’s your football skills, specialities and attributes compared to peers in your age? Let’s start with an overall view.',
                  },
                ]}
                className="mb-[20px]"
              />
              <div>
                {Object.keys(footBallSkills).map((skill: string) => (
                  <MySlider
                    isStar
                    key={skill}
                    step={5}
                    readOnly
                    label={_.upperFirst(skill)}
                    value={footBallSkills[skill]}
                    onChange={(e) =>
                      handleChangeSkills(skill as keyof FootBallSkillType, e)
                    }
                  />
                ))}
              </div>
            </>
          </ItemSkills>

          <ItemSkills className="w-[372px] h-[513px]">
            <Comments
              listComment={[
                {
                  img: '/avt-nick.svg',
                  text: 'And to be a bit more detailed, so we can build you a radar chart.',
                },
              ]}
              className="mb-[30px]"
            />
            <div className="-space-y-2">
              {Object.keys(radarCharts).map((radar: string) => (
                <MySlider
                  isNumber
                  key={radar}
                  step={1}
                  labelClass="text-[#A2A5AD]"
                  label={_.upperFirst(radar)}
                  value={footBallSkills[radar]}
                  onChange={(e) =>
                    handleChangeRadar(radar as keyof RadarChartType, e)
                  }
                />
              ))}
            </div>
          </ItemSkills>
          <ItemSkills className="w-[372px] h-[513px]">
            <Comments
              listComment={[
                {
                  img: '/avt-nick.svg',
                  text: 'Now, write a short summary of yourself and add your specialities',
                },
              ]}
              className="mb-[30px]"
            />
            <TextArea
              className={`${cls.note} rounded-[8px] h-[150px]`}
              onChange={(e) => {
                setNote(e.target.value)
              }}
              placeholder="As for ex. - Fast, hard shooting, power foward and striker with an amazing left foot."
              autoSize={{ minRows: 5, maxRows: 5 }}
              rows={5}
            />

            <div className="mt-[24px]">
              <MyInputChips
                label="Speciality tags"
                labelClass="text-[#A2A5AD]"
                value={tags}
                setTags={setTags}
              />
            </div>

            <div onClick={handleNext}>
              <Button
                text="Next"
                className="bg-[#4654EA] hover:bg-[#5b67f3] active:bg-[#293af8] rounded-[8px] text-[15px] w-full h-[48px] mt-[24px]"
              />
            </div>
          </ItemSkills>
        </div>
      </div>
    </div>
  )
}
