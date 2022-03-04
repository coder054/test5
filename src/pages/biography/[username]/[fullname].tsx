/* eslint-disable @next/next/no-img-element */
import useSWR, { SWRConfig } from 'swr'
import { Text } from 'src/components/Text'
import { loadIdToken, requireAuth } from 'src/config/firebase-admin'
import { fetcher, getStr, truncateStr } from 'src/utils/utils'
import React, { useEffect, useMemo } from 'react'
import { Loading } from 'src/components/loading/loading'
import { get, isEmpty } from 'lodash'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { useScreenWidth } from 'src/hooks/useScreenWidth'
import { axios } from 'src/utils/axios'
import Head from 'next/head'

import { IInfoClub, InfoClub } from 'src/module/bio/InfoClub'
import { SocialLinks } from 'src/module/bio/SocialLinks'
import { NavigationAndFilter } from 'src/module/bio/NavigationAndFilter'
import { TopVideos } from 'src/module/bio/TopVideos'
import { InfoWithCircleImage } from 'src/module/bio/InfoWithCircleImage'
import { InforWithNumbers } from 'src/module/bio/InfoWithNumbers'
import { InfoWithImages } from 'src/module/bio/InfoWithImages'
import { InforWithAChart } from 'src/module/bio/InfoWithAChart'

export const fetcherForEndpointFlip = async (url) => {
  if (url === null) return
  const data = await axios.get(url)
  if (data.status === 200) {
    return data.data.data.map((o) => {
      return o.userId
    })
  }
  return { error: true }
}

// Generated by https://quicktype.io

export interface IBiographyPlayer {
  friendCount: number
  followCount: number
  followStatus: string
  isConfirmBox: boolean
  isFollowed: boolean
  fanCount: number
  userId: string
  lastUpdatedDate: string
  username: string
  firstName: string
  lastName: string
  faceImageUrl: string
  bodyImageUrl: null
  starRating: number
  circleCompleted: number
  position: string
  currentClubIconUrl: string
  contractedUntil: string
  estMarketValue: number
  leftFoot: number
  rightFoot: number
  bestFoot: string
  height: number
  weight: number
  countryFlagUrl: string
  birthDay: string
  age: number
  summary: string
  socialLinks: ISocialLinks
  topVideoLinks: ITopVideoLink[]
  playerRadarSkills: IPlayerRadarSkills
  radarUpdatedByCoach: IPlayerRadarSkills
  specialities: string[]
  isPublic: boolean
  userRole: string
  activeSeasons: string[]
}

export interface IPlayerRadarSkills {
  passing: number
  dribbling: number
  heading: number
  defending: number
  pace: number
  attacking: number
  shooting: number
  tackling: number
}

export interface ISocialLinks {
  youtube: string
  instagram: string
  facebook: string
  tiktok: string
  veoHighlites: string
  twitter: string
}

export interface ITopVideoLink {
  thumbnailUrl: string
  url: string
  source: string
}

// Generated by https://quicktype.io

export interface IAvgPlayerScore {
  avgPlayerAttacking: number
  avgPlayerDefending: number
  avgPlayerDribbling: number
  avgPlayerPace: number
  avgPlayerPassing: number
  avgPlayerShooting: number
  avgPlayerTackling: number
  avgPlayerHeading: number
}

// Generated by https://quicktype.io

export interface IFlipPlayer {
  userId: string
  lastUpdatedDate: string
  username: string
  firstName: string
  lastName: null | string
  faceImageUrl: null | string
  bodyImageUrl: null
  starRating: number | null
  circleCompleted: number
  position: null | string
  currentClubIconUrl?: string
  contractedUntil: string
  estMarketValue: number | null
  leftFoot: number
  rightFoot: number
  bestFoot: string
  height: number | null
  weight: number | null
  countryFlagUrl: string
  birthDay: string
  age: number | null
  summary: null | string
  radarUpdatedByCoach: RadarUpdatedByCoach
  isPublic: boolean
  userRole: string
}

export interface RadarUpdatedByCoach {
  attacking: number
  defending: number
  dribbling: number
  passing: number
  shooting: number
  pace: number
  tackling: number
  heading: number
}

const Biography = () => {
  const { screenWidth } = useScreenWidth()
  const router = useRouter()

  const { username } = router.query
  const { currentRoleId } = useAuth()

  const { data: dataAvgPlayer, error: errorAvgPlayer } = useSWR(
    '/biographies/players/avg-radar'
  ) as {
    data: IAvgPlayerScore
    error: any
  }

  const { data: dataBio, error: errorBio } = useSWR(
    `/biographies/player?username=${username}`
  ) as {
    data: IBiographyPlayer
    error: any
  }
  const { data: dataClub, error: errorCldataClub } = useSWR(
    `/biographies/player/clubs?limit=20&startAfter=0&sorted=asc&username=${username}&type=HISTORIC`
  ) as {
    data: IInfoClub
    error: any
  }

  const dataBioRadarChart = useMemo(() => {
    const coach = get(dataBio, 'radarUpdatedByCoach')
    const average = dataAvgPlayer
    const you = get(dataBio, 'playerRadarSkills')
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
    get(dataBio, 'radarUpdatedByCoach'),
    get(dataBio, 'playerRadarSkills'),
  ])

  if (errorBio || errorAvgPlayer)
    return (
      <div className=" p-[40px] text-center">
        <div className="text-white ">Failed to load</div>
      </div>
    )
  if (!dataBio || !dataAvgPlayer)
    return (
      <div className=" p-[40px] text-center">
        <Loading size={40}></Loading>
      </div>
    )

  return (
    <DashboardLayout>
      <div className="px-[16px] xl:px-[39px] py-[39px] ">
        {/* /// Navigate and filter */}
        <NavigationAndFilter username={dataBio.username}></NavigationAndFilter>

        <div className="h-[32px] 2xl:h-[42px] "></div>

        {/* /// 2 main column */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[24px] 2xl:gap-[24px] ">
          <div
            style={{
              background: 'rgba(32, 33, 40, 0.3)',
              backdropFilter: 'blur(68px)',
            }}
            className="rounded-[8px] p-[16px] sm:p-[32px] mx-auto w-full sm:w-[532px] lg:w-full "
          >
            <div className="max-w-[466px] mx-auto ">
              <InfoWithCircleImage
                dataBio={dataBio}
                currentRoleId={currentRoleId}
              />

              <div className="h-[1px] my-[40px] bg-Stroke "></div>
              <InfoWithImages />
            </div>
          </div>

          <div
            style={{
              background: 'rgba(32, 33, 40, 0.3)',
              backdropFilter: 'blur(68px)',
            }}
            className="rounded-[8px] p-[16px] sm:p-[32px] mx-auto w-full sm:w-[532px] lg:w-full "
          >
            <div className="max-w-[466px] mx-auto">
              <InforWithAChart
                dataBio={dataBio}
                dataBioRadarChart={dataBioRadarChart}
              ></InforWithAChart>

              <div className="h-[1px] my-[32px] bg-Stroke "></div>

              <InforWithNumbers
                dataClub={dataClub}
                activeSeasons={dataBio.activeSeasons}
              />
            </div>
          </div>
        </div>

        <div className="mt-[30px] ">
          <SocialLinks socialLinks={dataBio.socialLinks} />
        </div>

        <div className="h-[32px] "></div>

        <TopVideos dataBio={dataBio} />
      </div>
    </DashboardLayout>
  )
}

// Biography.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>
export const getServerSideProps: any = async ({ req, res, query }) => {
  // for NOW, require logged in

  const uid = await loadIdToken(req as any)

  const fullname = query.fullname // not use
  const username = query.username

  let dataBio: IBiographyPlayer | {}
  let dataClub: IInfoClub | {}
  let dataAvgPlayer: IAvgPlayerScore | {}

  const fetcher1 = async (url) => {
    if (url === null) return

    //@ts-ignore: Unreachable code error
    axios.defaults.headers.username = username
    if (uid) {
      //@ts-ignore: Unreachable code error
      axios.defaults.headers.roleId = uid
    }
    const data = await axios.get(url)
    if (data.status === 200) {
      return data.data
    }
    return { error: true }
  }

  ///////////////////////////////////////////////

  try {
    ;[dataBio, dataClub, dataAvgPlayer] = await Promise.all([
      fetcher1(`/biographies/player?username=${username}`),
      fetcher(
        `/biographies/player/clubs?limit=20&startAfter=0&sorted=asc&username=${username}&type=HISTORIC`
      ),
      fetcher1('/biographies/players/avg-radar'),
    ])
  } catch (error) {
    ;[dataBio, dataClub, dataAvgPlayer] = [{}, {}, {}]
  }

  ///////////////////////////////////////////////

  return {
    props: {
      fallback: {
        [`/biographies/player?username=${username}`]: dataBio,
        [`/biographies/player/clubs?limit=20&startAfter=0&sorted=asc&username=${username}&type=HISTORIC`]:
          dataClub,
        [`/biographies/players/avg-radar`]: dataAvgPlayer,
      },
    },
  }
}

export default function BiographyWithSWR({ fallback }) {
  useEffect(() => {
    console.log('aaa fallback: ', fallback)
  }, [fallback])

  const dataBio = useMemo(() => {
    if (isEmpty(fallback)) {
      return {}
    }
    return (
      Object.values(fallback).filter((o) => o.hasOwnProperty('username'))[0] ||
      {}
    )
  }, [fallback])

  return (
    <>
      <Head>
        <title>
          {get(dataBio, 'firstName') + ' ' + get(dataBio, 'lastName')}
        </title>
        <meta name="description" content="Zporter"></meta>
        <meta property="og:url" content="https://www.byeindonesia.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={get(dataBio, 'firstName') + ' ' + get(dataBio, 'lastName')}
        />
        <meta property="og:description" content="Zporter" />
        <meta
          property="og:image"
          content={
            get(dataBio, 'faceImageUrl') ||
            'https://images.unsplash.com/photo-1645877409345-0389b63d382d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
          }
        />
      </Head>
      <SWRConfig value={{ fallback }}>
        <Biography />
      </SWRConfig>
    </>
  )
}
