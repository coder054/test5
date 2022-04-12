import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, MyInputChips } from 'src/components'
import { Comments } from 'src/components/Comments'
const cls = require('./update-profile-coach-skills.module.css')
import { GoBack } from 'src/components/go-back'
import { ItemSkills } from 'src/components/item-skills'
import { Input } from 'antd'
import { useAtom } from 'jotai'
import { profileCoachAtom } from 'src/atoms/profileCoachAtom'
import { axios } from 'src/utils/axios'
import { API_UPDATE_PROFILE_COACH } from 'src/constants/api.constants'
import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/constants'
import { MySlider } from 'src/components/MySlider'
import _ from 'lodash'

interface CoachSkillsType {
  technics: number
  tactics: number
  physics: number
  mental: number
}

interface RadarChartType {
  attacking: number
  defending: number
  turnovers: number
  pieces: number
  analytics: number
  playerDevelopment: number
}
import toast from 'react-hot-toast'
import { getErrorMessage } from 'src/utils/utils'

export const SignUpFormCoachSkills = () => {
  const [profileCoachForm, setProfileCoachForm] = useAtom(profileCoachAtom)

  const { TextArea } = Input
  const date = new Date()
  const router = useRouter()
  const { profile } = router.query

  const [coachSkills, setCoachSkills] = useState<CoachSkillsType>({
    technics: 0,
    tactics: 0,
    physics: 0,
    mental: 0,
  })

  const [radarChart, setRadarChart] = useState<RadarChartType>({
    attacking: 0,
    defending: 0,
    turnovers: 0,
    pieces: 0,
    analytics: 0,
    playerDevelopment: 0,
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

  const handleChangeSkills = (type: keyof CoachSkillsType, value: string) => {
    setCoachSkills((prev) => ({ ...prev, [type]: value }))
  }

  const handleChangeRadar = (type: keyof RadarChartType, value: string) => {
    setRadarChart((prev) => ({ ...prev, [type]: value }))
  }

  const handleNext = async (e) => {
    e.preventDefault()

    const profileCoach = {
      health: {
        height: {
          value: 0,
          updatedAt: date.toISOString(),
        },
        weight: {
          value: 0,
          updatedAt: date.toISOString(),
        },
        leftFootLength: 0,
        rightFootLength: 0,
      },
      media: {
        faceImage: profileCoachForm?.media?.faceImage,
        bodyImage: profileCoachForm?.media?.bodyImage,
        teamImage: '',
        videoLinks: [],
      },
      profile: {
        phone: '',
        firstName: profileCoachForm?.profile?.firstName,
        lastName: profileCoachForm?.profile?.lastName,
        gender: 'MALE',
        birthCountry: profileCoachForm?.profile?.birthCountry,
        birthDay: profileCoachForm?.profile?.birthDay,
        homeAddress: '',
        postNumber: '',
        region: '',
        city: profileCoachForm?.profile?.city,
      },
      settings: {
        country: profileCoachForm?.profile?.birthCountry,
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
      coachCareer: {
        clubId: profileCoachForm?.coachCareer?.clubId,
        contractedFrom: date.toISOString(),
        contractedUntil: date.toISOString(),
        seasonStartDate: date.toISOString(),
        seasonEndDate: date.toISOString(),
        acceptedTeamIds: profileCoachForm?.coachCareer?.acceptedTeamIds,
        pendingTeamIds: [],
        role: profileCoachForm?.coachCareer?.role,
        highestCoachingEducation:
          profileCoachForm?.coachCareer?.highestCoachingEducation,
        expLevel: profileCoachForm?.coachCareer?.expLevel,
        managementStyle: profileCoachForm?.coachCareer?.managementStyle,
        managementType: profileCoachForm?.coachCareer?.managementType,
        summary: note,
      },
      coachSkills: {
        specialityTags: tags,
        overall: {
          mental: coachSkills.mental / 20,
          physics: coachSkills.physics / 20,
          tactics: coachSkills.tactics / 20,
          technics: coachSkills.technics / 20,
        },
        radar: {
          attacking: radarChart.attacking,
          defending: radarChart.defending,
          turnovers: radarChart.turnovers,
          setPieces: radarChart.pieces,
          analytics: radarChart.analytics,
          playerDevelopment: radarChart.playerDevelopment,
        },
      },
    }

    try {
      const response = await axios.put(API_UPDATE_PROFILE_COACH, {
        ...profileCoach,
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
          label="Update your profile"
          goBack="/update-profile-player?profile=player"
        />
      </div>

      <div className="absolute z-20 w-full bottom-12">
        <div className="mx-auto w-2/3 grid grid-cols-3 gap-2">
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
                {Object.keys(coachSkills).map((skill) => (
                  <MySlider
                    isStar
                    key={skill}
                    step={5}
                    readOnly
                    label={_.upperFirst(skill)}
                    value={coachSkills[skill]}
                    onChange={(e) =>
                      handleChangeSkills(skill as keyof CoachSkillsType, e)
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
              {Object.keys(radarChart).map((radar) => (
                <MySlider
                  isNumber
                  key={radar}
                  step={1}
                  readOnly
                  label={_.upperFirst(radar)}
                  value={radarChart[radar]}
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
              placeholder="Short summary of yourself"
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
                className="bg-[#4654EA] hover:bg-[#5b67f3] active:bg-[#293af8]  rounded-[8px] text-[15px] w-full h-[48px] mt-[24px]"
              />
            </div>
          </ItemSkills>
        </div>
      </div>
    </div>
  )
}
