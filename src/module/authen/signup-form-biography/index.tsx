import { useAtom } from 'jotai'
import { useState, useEffect, useMemo } from 'react'
import { profileAtom } from 'src/atoms/profileAtom'
import { GoBack } from 'src/components/go-back'
import {
  API_COACH_PROFILE,
  API_GET_BIOGRAPHY_PLAYER,
  API_PLAYER_PROFILE,
} from 'src/constants/api.constants'
import { ROUTES } from 'src/constants/constants'
import { InforWithAChart } from 'src/module/bio/InfoWithAChart'
import { InfoWithCircleImage } from 'src/module/bio/InfoWithCircleImage'
import {
  IAvgPlayerScore,
  IBiographyPlayer,
} from 'src/pages/biography/[username]/[fullname]'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { fetcher } from 'src/utils/utils'
import useSWR from 'swr'
import { useAuth } from '../auth/AuthContext'
const cls = require('./signup-form-biography.module.css')
import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'

export const SignupFormBiography = () => {
  const { currentRoleId, playerProfile, coachProfile, currentUser } = useAuth()
  const router = useRouter()
  const { profile } = router.query
  console.log('profile', profile)

  const [data, setData] = useState<IBiographyPlayer>({
    isConfirmBox: true,
    isFollowed: true,
    friendCount: 0,
    followCount: 0,
    fanCount: 0,
    userId: '',
    lastUpdatedDate: '',
    username: '',
    firstName: '',
    lastName: '',
    faceImageUrl: '',
    bodyImageUrl: '',
    starRating: 0,
    circleCompleted: 0,
    position: '',
    currentClubIconUrl: '',
    contractedUntil: '',
    estMarketValue: 0,
    leftFoot: 0,
    rightFoot: 0,
    bestFoot: '',
    height: 0,
    weight: 0,
    countryFlagUrl: '',
    birthDay: '',
    age: 0,
    summary: '',
    socialLinks: {
      veoHighlites: '',
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: '',
      youtube: '',
    },
    topVideoLinks: [],
    playerRadarSkills: {
      defending: 0,
      tackling: 0,
      passing: 0,
      dribbling: 0,
      attacking: 0,
      pace: 0,
      heading: 0,
      shooting: 0,
    },
    radarUpdatedByCoach: {
      defending: 0,
      tackling: 0,
      passing: 0,
      dribbling: 0,
      attacking: 0,
      pace: 0,
      heading: 0,
      shooting: 0,
    },
    specialities: [],
    isPublic: true,
    userRole: '',
    bioUrl: '',
    activeSeasons: [],
  })

  // const [dataCoach, setDataCoach] = useState<>()

  const { data: dataAvgPlayer, error: errorAvgPlayer } = useSWR(
    '/biographies/players/avg-radar',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  ) as {
    data: IAvgPlayerScore
    error: any
  }

  useEffect(() => {
    const getBio = async () => {
      if (profile === 'Player') {
        const res = await axios.get(toQueryString(API_PLAYER_PROFILE))
        // console.log('res', res.data.username)

        const response = await axios.get(
          `/biographies/player?username=${res.data.username}`
        )
        console.log('res', response.data)
        setData(response.data)
      } else if (profile === 'Coach') {
        // const res = await axios.get(toQueryString(API_COACH_PROFILE))
        // console.log('res', res.data.username)
        // const response = await axios.get(
        //   `/biographies/coach?username=${res.data.username}`
        // )
        // console.log('res', response.data)
        // setData(response.data)
      }
    }

    getBio()
  }, [])

  const dataBioRadarChart = useMemo(() => {
    const coach = get(data, 'radarUpdatedByCoach')
    const average = dataAvgPlayer
    const you = get(data, 'playerRadarSkills')
    if (!coach || !average || !you) {
      return [{}]
    }

    return [
      {
        subject: 'ATTACKING',
        You: you.attacking,
        Average: average.avgPlayerAttacking,
        Coach: coach.attacking,
        fullMark: 100,
      },
      {
        subject: 'PACE',
        You: you.pace,
        Average: average.avgPlayerPace,
        Coach: coach.pace,
        fullMark: 100,
      },
      {
        subject: 'SHOOTING',
        You: you.shooting,
        Average: average.avgPlayerShooting,
        Coach: coach.shooting,
        fullMark: 100,
      },
      {
        subject: 'PASSING',
        You: you.passing,
        Average: average.avgPlayerPassing,
        Coach: coach.passing,
        fullMark: 100,
      },
      {
        subject: 'DEFENDING',
        You: you.defending,
        Average: average.avgPlayerDefending,
        Coach: coach.defending,
        fullMark: 100,
      },
      {
        subject: 'TACKLING',
        You: you.tackling,
        Average: average.avgPlayerTackling,
        Coach: coach.tackling,
        fullMark: 100,
      },
      {
        subject: 'HEADING',
        You: you.heading,
        Average: average.avgPlayerHeading,
        Coach: coach.heading,
        fullMark: 100,
      },
      {
        subject: 'DRIBBLING',
        You: you.dribbling,
        Average: average.avgPlayerDribbling,
        Coach: coach.dribbling,
        fullMark: 100,
      },
    ]
  }, [
    dataAvgPlayer,
    get(data, 'radarUpdatedByCoach'),
    get(data, 'playerRadarSkills'),
  ])
  console.log('dataBioRadarChart', dataBioRadarChart)

  return (
    <div className="autofill2 w-screen min-h-screen float-left lg:flex md:items-center">
      <div className="absolute top-[16px] lg:top-[40px] md:left-[40px] z-20">
        <GoBack
          label="Sign up form"
          goBack={ROUTES.SIGNUP_FORM_PLAYER_SKILLS}
        />
      </div>

      <div className="w-2/3 h-full mx-auto grid grid-cols-2 -mt-[48px]">
        <div
          className={`${cls.formInfor} rounded-[8px] w-[568px] p-[24px] z-30 max-h-[626px]`}
        >
          <InfoWithCircleImage
            dataBio={data}
            currentRoleId={currentRoleId}
            signupForm
          />
        </div>
        <div
          className={`${cls.formInfor} rounded-[8px] w-[568px] p-[24px] z-30 `}
        >
          <InforWithAChart
            dataBio={data}
            dataBioRadarChart={dataBioRadarChart}
            signupForm
          />
        </div>
      </div>
    </div>
  )
}
