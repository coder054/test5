import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, SliderStar } from 'src/components'
import { Comments } from 'src/components/Comments'
const cls = require('./update-profile-coach-skills.module.css')
import { GoBack } from 'src/components/go-back'
import { ItemSkills } from 'src/components/item-skills'
import { Input } from 'antd'
import { SpecialityTags } from 'src/components/speciality-tags'
import { useAtom } from 'jotai'
import { profileCoachAtom } from 'src/atoms/profileCoachAtom'
import { axios } from 'src/utils/axios'
import { API_UPDATE_PROFILE_COACH } from 'src/constants/api.constants'
import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/constants'

export const SignUpFormCoachSkills = () => {
  const [profileCoachForm, setProfileCoachForm] = useAtom(profileCoachAtom)

  const { TextArea } = Input
  const date = new Date()
  const router = useRouter()
  const { profile } = router.query

  const [technics, setTechnics] = useState<number>(0)
  const [tactics, setTactics] = useState<number>(0)
  const [physics, setPhysics] = useState<number>(0)
  const [mental, setMental] = useState<number>(0)

  const [attacking, setAttacking] = useState<number>(0)
  const [defending, setDefending] = useState<number>(0)
  const [turnovers, setTurnovers] = useState<number>(0)
  const [pieces, setPieces] = useState<number>(0)
  const [analytics, setAnalytics] = useState<number>(0)
  const [playerDevelopment, setPlayerDevelopment] = useState<number>(0)

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
          mental: mental / 20,
          physics: physics / 20,
          tactics: tactics / 20,
          technics: technics / 20,
        },
        radar: {
          attacking: attacking,
          defending: defending,
          turnovers: turnovers,
          setPieces: pieces,
          analytics: analytics,
          playerDevelopment: playerDevelopment,
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
    } catch (error) {}
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
                className="mb-[28px]"
              />
              <SliderStar
                star
                label="Technics"
                className="h-[60px]"
                setValues={setTechnics}
              />
              <SliderStar
                star
                label="Tactics"
                className="h-[60px]"
                setValues={setTactics}
              />
              <SliderStar
                star
                label="Physics"
                className="h-[60px]"
                setValues={setPhysics}
              />
              <SliderStar
                star
                label="Mental"
                className="h-[60px]"
                setValues={setMental}
              />
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
            <SliderStar
              point
              label="Attacking"
              className="h-[60px]"
              setValues={setAttacking}
            />
            <SliderStar
              point
              label="Defending"
              className="h-[60px]"
              setValues={setDefending}
            />
            <SliderStar
              point
              label="Turnovers"
              className="h-[60px]"
              setValues={setTurnovers}
            />
            <SliderStar
              point
              label="Set Pieces"
              className="h-[60px]"
              setValues={setPieces}
            />
            <SliderStar
              point
              label="Analytics"
              className="h-[60px]"
              setValues={setAnalytics}
            />
            <SliderStar
              point
              label="Player development"
              className="h-[60px]"
              setValues={setPlayerDevelopment}
            />
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
            <SpecialityTags label="Speciality tags" setTags={setTags} />
            <div onClick={handleNext}>
              <Button
                text="Next"
                className="bg-[#4654EA] rounded-[8px] text-[15px] w-full h-[48px] mt-[24px]"
              />
            </div>
          </ItemSkills>
        </div>
      </div>
    </div>
  )
}
