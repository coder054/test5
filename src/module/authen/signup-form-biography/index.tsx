import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { GoBack } from 'src/components/go-back'
import { Loading } from 'src/components/loading/loading'
import {
  IAvgCoachScore,
  IAvgPlayerScore,
  IBiographyCoach,
  IBiographyPlayer,
} from 'src/constants/types/biography.types'
import { InfoPlayerWithAChart } from 'src/module/bio/InfoPlayerWithAChart'
import { InfoCoachWithAChart } from 'src/module/bio/InfoCoachWithAChart'
import { InfoPlayerWithCircleImage } from 'src/module/bio/InfoPlayerWithCircleImage'
import { InfoCoachWithCircleImage } from 'src/module/bio/InfoCoachWithCircleImage'
import { axios } from 'src/utils/axios'
import { fetcher, getStr } from 'src/utils/utils'
import useSWR from 'swr'
import { useAuth } from '../auth/AuthContext'

const cls = require('./signup-form-biography.module.css')

export const SignupFormBiography = () => {
  const { currentRoleId, updateUserRoles } = useAuth()
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
    summary: null,
    topVideoLinks: [],
    userId: '',
    userRole: '',
    username: '',
    isFollowed: true,
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
    '/biographies/coaches/avg-radar',
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

  useEffect(() => {
    const getBio = async () => {
      if (profile && profile === 'Player') {
        const { data, error } = await updateUserRoles()
        const roleId = getStr(data, '[0].roleId')
        //@ts-ignore: Unreachable code error
        axios.defaults.headers.roleId = roleId
        try {
          const response = await axios.get(
            `/biographies/player?userIdQuery=${currentRoleId || roleId}`
          )

          setData(response.data)
        } catch (error) {}
      } else if (profile && profile === 'Coach') {
        const { data, error } = await updateUserRoles()
        const roleId = getStr(data, '[0].roleId')
        //@ts-ignore: Unreachable code error
        axios.defaults.headers.roleId = roleId
        try {
          const response = await axios.get(
            `/biographies/coach?userIdQuery=${currentRoleId || roleId}`
          )
          setDataCoach(response.data)
        } catch (error) {}
      }
    }

    getBio()
  }, [])

  const dataBioCoachRadarChart = useMemo(() => {
    const average = dataAvgCoach
    const you = get(dataCoach, 'coachRadarSkills')
    if (!you || !average) {
      return [{}]
    }

    return [
      {
        subject: 'ATTACKING',
        You: 10,
        //@ts-ignore: Unreachable code error
        Average: average.avgCoachAttacking || average.attacking,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'TURNOVERS',
        You: 30,
        //@ts-ignore: Unreachable code error
        Average: average.avgCoachTurnovers || average.turnovers,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'ANALYTICS',
        You: 66,
        //@ts-ignore: Unreachable code error
        Average: average.avgCoachAnalytics || average.analytics,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'DEFENDING',
        You: 77,
        //@ts-ignore: Unreachable code error
        Average: average.avgCoachDefending || average.defending,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'PLAYER DEV.',
        You: 88,
        //@ts-ignore: Unreachable code error
        Average: average.avgCoachPlayerDevelopment || average.playerDevelopment,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'SET PIECES',
        You: 99,
        //@ts-ignore: Unreachable code error
        Average: average.avgCoachSetPieces || average.setPieces,
        Coach: 0,
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

  console.log('dataCoach', dataCoach)
  console.log('dataBioCoachRadarChart', dataBioCoachRadarChart)

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
          {data.userId && profile === 'Player' && (
            <InfoPlayerWithCircleImage
              dataBio={data}
              currentRoleId={currentRoleId}
              signupForm
            />
          )}

          {profile === 'Coach' && data.userId ? (
            <InfoCoachWithCircleImage
              dataBio={dataCoach}
              currentRoleId={currentRoleId}
              signupForm
            />
          ) : null}
        </div>
        <div
          className={`${cls.formInfor} rounded-[8px] w-[568px] p-[24px] z-30 `}
        >
          {profile === 'Player' && (
            <InfoPlayerWithAChart
              dataBio={data}
              dataBioRadarChart={dataBioRadarChart}
              signupForm
              profile={profile as string}
            />
          )}

          {profile === 'Coach' ? (
            <InfoCoachWithAChart
              dataBio={dataCoach}
              dataBioRadarChart={dataBioCoachRadarChart}
              // signupForm
              profile="coach"
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
