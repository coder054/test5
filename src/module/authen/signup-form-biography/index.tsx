import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { GoBack } from 'src/components/go-back'
import { Loading } from 'src/components/loading/loading'
import {
  API_COACH_PROFILE,
  API_PLAYER_PROFILE,
} from 'src/constants/api.constants'
import { ROUTES } from 'src/constants/constants'
import {
  IAvgPlayerScore,
  IBiographyPlayer,
} from 'src/constants/types/biography.types'
import { InforWithAChart } from 'src/module/bio/InfoWithAChart'
import { InfoWithCircleImage } from 'src/module/bio/InfoWithCircleImage'
import { axios } from 'src/utils/axios'
import { fetcher } from 'src/utils/utils'
import useSWR from 'swr'
import { useAuth } from '../auth/AuthContext'
import { IAvgCoachScore, IBiographyCoach } from '../types'

const cls = require('./signup-form-biography.module.css')

export const SignupFormBiography = () => {
  const { currentRoleId, playerProfile, coachProfile, updateUserRoles } =
    useAuth()
  const router = useRouter()
  const { profile } = router.query

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

  const [dataCoach, setDataCoach] = useState<IBiographyCoach>({
    activeSeasons: [],
    age: 0,
    bioUrl: '',
    birthDay: '',
    circleCompleted: 0,
    coachRadarSkills: {
      attacking: 0,
      playerDevelopment: 0,
      turnovers: 0,
      setPieces: 0,
      defending: 0,
      analytics: 0,
    },
    contractedUntil: '',
    countryFlagUrl: '',
    currentClubIconUrl: '',
    education: '',
    expLevel: '',
    faceImageUrl: '',
    fanCount: 0,
    firstName: '',
    followCount: 0,
    friendCount: 0,
    lastName: '',
    lastUpdatedDate: '',
    managementStyle: '',
    managementType: '',
    position: '',
    socialLinks: {
      veoHighlites: '',
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: '',
      youtube: '',
    },
    specialities: [],
    starRating: 0,
    summary: '',
    topVideoLinks: [],
    userId: '',
    userRole: '',
    username: '',
  })

  const { data: dataAvgPlayer, error: errorAvgPlayer } = useSWR(
    '/biographies/players/avg-radar',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  ) as {
    data: IAvgPlayerScore
    error: any
  }

  const { data: dataAvgCoach, error: errorAvgCoach } = useSWR(
    '/biographies/coachs/avg-radar',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  ) as {
    data: IAvgCoachScore
    error: any
  }
  // console.log('playerProfile', playerProfile)
  // console.log('data', data)
  // console.log('userRoles', userRoles)

  useEffect(() => {
    const getBio = async () => {
      if (profile && profile === 'Player') {
        await updateUserRoles()
        try {
          const response = await axios.get(
            `/biographies/player?userIdQuery=${playerProfile.userId}`
          )
          console.log('response', response.data)

          setData(response.data)
        } catch (error) {}
      } else if (profile && profile === 'Coach') {
        await updateUserRoles()
        try {
          const response = await axios.get(
            `/biographies/coach?userIdQuery=${coachProfile.userId}`
          )
          setDataCoach(response.data)
        } catch (error) {}
      }
    }

    getBio()
  }, [])

  const dataBioCoachRadarChart = useMemo(() => {
    const coach = get(dataCoach, 'coachRadarSkills')
    const average = dataAvgCoach
    if (!coach || !average) {
      return [{}]
    }

    return [
      {
        subject: 'ATTACKING',
        Average: average.avgCoachAttacking,
        Coach: coach.attacking,
        fullMark: 100,
      },
      {
        subject: 'ANALYTICS',
        Average: average.avgCoachAnalytics,
        Coach: coach.analytics,
        fullMark: 100,
      },
      {
        subject: 'SETPIECES',
        Average: average.avgCoachSetPieces,
        Coach: coach.setPieces,
        fullMark: 100,
      },
      {
        subject: 'URNOVERS',
        Average: average.avgCoachTurnovers,
        Coach: coach.turnovers,
        fullMark: 100,
      },
      {
        subject: 'DEFENDING',
        Average: average.avgCoachDefending,
        Coach: coach.defending,
        fullMark: 100,
      },
      {
        subject: 'PLAYERDEVELOPMENT',
        Average: average.avgCoachPlayerDevelopment,
        Coach: coach.playerDevelopment,
        fullMark: 100,
      },
    ]
  }, [dataAvgCoach, get(dataCoach, 'coachRadarSkills')])

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

  return (
    <div className="autofill2 w-screen min-h-screen float-left lg:flex md:items-center">
      <div className="absolute top-[16px] lg:top-[40px] md:left-[40px] z-20">
        <GoBack
          label="Sign up form"
          // goBack={ROUTES.SIGNUP_FORM_PLAYER_SKILLS}
        />
      </div>

      <div className="w-2/3 h-full mx-auto grid grid-cols-2 -mt-[48px]">
        <div
          className={`${cls.formInfor} rounded-[8px] w-[568px] p-[24px] z-30 max-h-[626px]`}
        >
          {data.userId ? (
            <InfoWithCircleImage
              dataBio={profile === 'Player' ? data : dataCoach}
              currentRoleId={currentRoleId}
              signupForm
            />
          ) : (
            <div className="w-12 mx-auto">
              <Loading />
            </div>
          )}
        </div>
        <div
          className={`${cls.formInfor} rounded-[8px] w-[568px] p-[24px] z-30 `}
        >
          <InforWithAChart
            dataBio={profile === 'Player' ? data : dataCoach}
            dataBioRadarChart={
              profile === 'Player' ? dataBioRadarChart : dataBioCoachRadarChart
            }
            signupForm
            profile={profile as string}
          />
        </div>
      </div>
    </div>
  )
}
