/* eslint-disable @next/next/no-img-element */
import { Divider, Tab, Tabs } from '@mui/material'
import { get, isEmpty } from 'lodash'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useMemo } from 'react'
import { isDesktop } from 'react-device-detect'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { Loading } from 'src/components/loading/loading'
import { loadIdToken } from 'src/config/firebase-admin'
import { COOKIE_KEY } from 'src/constants/constants'
import {
  IAvgPlayerScore,
  IAvgCoachScore,
  IBiographyPlayer,
  IBiographyCoach,
} from 'src/constants/types/biography.types'
import { useScreenWidth } from 'src/hooks/useScreenWidth'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { IInfoClub } from 'src/module/bio/InfoClub'
import { InfoPlayerWithAChart } from 'src/module/bio/InfoPlayerWithAChart'
import { InfoCoachWithAChart } from 'src/module/bio/InfoCoachWithAChart'
import { InfoPlayerWithCircleImage } from 'src/module/bio/InfoPlayerWithCircleImage'
import { InfoCoachWithCircleImage } from 'src/module/bio/InfoCoachWithCircleImage'
import { InfoWithImages } from 'src/module/bio/InfoWithImages'
import { InforWithNumbers } from 'src/module/bio/InfoWithNumbers'
import { NavigationAndFilter } from 'src/module/bio/NavigationAndFilter'
import { SocialLinksComponent } from 'src/module/bio/SocialLinksComponent'
import { TopVideos } from 'src/module/bio/TopVideos'
import { UpdateBiography } from 'src/module/biography/Update'
import { axios } from 'src/utils/axios'
import axiosLib from 'axios'
import { fetcher, getErrorMessage, parseCookies } from 'src/utils/utils'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

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

const tabs = [
  { label: 'Biography', value: 'biography' },
  { label: 'Diary', value: 'diary' },
  { label: 'Update', value: 'update' },
]

export default function Biography({
  dataBioPlayer,
  dataBioCoach,
  dataClub,
  dataAvgPlayer,
  dataAvgCoach,
  error,
  profile,
}: {
  dataBioPlayer: IBiographyPlayer
  dataBioCoach: IBiographyCoach
  dataClub: IInfoClub
  dataAvgPlayer: IAvgPlayerScore
  dataAvgCoach: IAvgCoachScore
  error: boolean
  profile: string
}) {
  if (error) {
    return <div className=" ">Error occured</div>
  }
  const [currentTab, setCurrentTab] = useQueryParam(
    'type',
    withDefault(StringParam, 'biography')
  )
  const { screenWidth } = useScreenWidth()
  const router = useRouter()

  const { username } = router.query
  const { currentRoleId, authenticated } = useAuth()

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <DashboardLayout>
      {profile === 'coach' ? (
        <BioForCoach
          dataBioCoach={dataBioCoach}
          dataAvgCoach={dataAvgCoach}
          profile={profile}
          currentRoleId={currentRoleId}
          authenticated={authenticated}
          currentTab={currentTab}
          dataClub={dataClub}
          router={router}
          handleTabsChange={handleTabsChange}
        />
      ) : (
        <BioForPlayer
          dataBioPlayer={dataBioPlayer}
          dataAvgPlayer={dataAvgPlayer}
          authenticated={authenticated}
          currentTab={currentTab}
          handleTabsChange={handleTabsChange}
          currentRoleId={currentRoleId}
          profile={profile}
          dataClub={dataClub}
          router={router}
        />
      )}
    </DashboardLayout>
  )
}

const BioForPlayer = ({
  dataBioPlayer,
  dataAvgPlayer,
  authenticated,
  currentTab,
  handleTabsChange,
  currentRoleId,
  profile,
  dataClub,
  router,
}: {
  dataBioPlayer: IBiographyPlayer
  dataAvgPlayer: IAvgPlayerScore
  authenticated: boolean
  currentTab: string
  handleTabsChange: Function
  currentRoleId: any
  profile: string
  dataClub: IInfoClub
  router: any
}) => {
  useEffect(() => {
    const {
      friendStatus,
      followStatus,
      isConfirmBox,
      isFollowed,
      isPublic,
      userId,
    } = dataBioPlayer
    console.log('aaa dataBio: ', dataBioPlayer, {
      friendStatus,
      followStatus,
      isConfirmBox,
      isFollowed,
      isPublic,
      userId,
    })
  }, [dataBioPlayer])

  useEffect(() => {
    console.log('aaa dataBioPlayer: ', dataBioPlayer)
  }, [dataBioPlayer])

  const dataBioPlayerRadarChart = useMemo(() => {
    const coach = get(dataBioPlayer, 'radarUpdatedByCoach')
    const average = dataAvgPlayer
    const you = get(dataBioPlayer, 'playerRadarSkills')
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
    get(dataBioPlayer, 'radarUpdatedByCoach'),
    get(dataBioPlayer, 'playerRadarSkills'),
  ])

  return (
    <>
      <Head>
        <title>
          {get(dataBioPlayer, 'firstName') +
            ' ' +
            get(dataBioPlayer, 'lastName')}
        </title>
        <meta name="description" content="Zporter"></meta>
        <meta property="og:url" content="https://www.byeindonesia.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            get(dataBioPlayer, 'firstName') +
            ' ' +
            get(dataBioPlayer, 'lastName')
          }
        />
        <meta property="og:description" content="Zporter" />
        <meta
          property="og:image"
          content={
            get(dataBioPlayer, 'faceImageUrl') ||
            'https://images.unsplash.com/photo-1645877409345-0389b63d382d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
          }
        />
      </Head>
      <div className="mobileM:px-[16px] laptopM:px-[60px] pt-[18px]">
        <Tabs
          indicatorColor="secondary"
          //@ts-ignore: Unreachable code error
          onChange={handleTabsChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="secondary"
          value={currentTab}
          sx={{ display: authenticated ? 'block' : 'none' }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </div>
      {isDesktop && <Divider sx={{ mb: 3, borderBottomWidth: 0 }} />}
      <div className="mobileM:px-[16px] laptopM:px-[60px] laptopM:mb-11">
        {currentTab === 'biography' && (
          <div>
            {/* /// Navigate and filter */}
            <NavigationAndFilter
              username={dataBioPlayer.username}
            ></NavigationAndFilter>

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
                  <InfoPlayerWithCircleImage
                    dataBio={dataBioPlayer}
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
                  <InfoPlayerWithAChart
                    profile={profile}
                    dataBio={dataBioPlayer}
                    dataBioRadarChart={dataBioPlayerRadarChart}
                  ></InfoPlayerWithAChart>

                  <div className="h-[1px] my-[32px] bg-Stroke "></div>

                  <InforWithNumbers
                    dataClub={dataClub}
                    activeSeasons={dataBioPlayer.activeSeasons}
                    router={router}
                  />
                </div>
              </div>
            </div>

            {/*  */}
            <div className="mt-[30px] ">
              <SocialLinksComponent socialLinks={dataBioPlayer.socialLinks} />
            </div>

            <TopVideos dataBio={dataBioPlayer} />
            {/*  */}
          </div>
        )}
        {currentTab === 'update' && <UpdateBiography />}
        {/* {currentTab === 'profile' && <Profile />} */}
      </div>
    </>
  )
}

const BioForCoach = ({
  dataBioCoach,
  dataAvgCoach,
  profile,
  currentRoleId,
  authenticated,
  currentTab,
  handleTabsChange,
  dataClub,
  router,
}: {
  dataBioCoach: IBiographyCoach
  dataAvgCoach: IAvgCoachScore
  profile: string
  currentRoleId: string
  authenticated: boolean
  currentTab: string
  handleTabsChange: Function
  dataClub: IInfoClub
  router: any
}) => {
  useEffect(() => {
    console.log('aaa dataBioCoach: ', dataBioCoach)
  }, [dataBioCoach])

  const dataBioCoachRadarChart = useMemo(() => {
    // todo
    const coach = get(dataBioCoach, 'radarUpdatedByCoach')
    const average = dataAvgCoach
    const you = get(dataBioCoach, 'coachRadarSkills')
    // todo
    if (!average || !you) {
      return [{}]
    }

    return [
      {
        subject: 'ATTACKING',
        You: you.attacking,
        Average: average.attacking,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'TURNOVERS',
        You: you.turnovers,
        Average: average.turnovers,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'ANALYTICS',
        You: you.analytics,
        Average: average.analytics,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'DEFENDING',
        You: you.defending,
        Average: average.defending,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'PLAYER DEV.',
        You: you.playerDevelopment,
        Average: average.playerDevelopment,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'SET PIECES',
        You: you.setPieces,
        Average: average.setPieces,
        Coach: 0,
        fullMark: 100,
      },
    ]
  }, [
    dataAvgCoach,
    get(dataBioCoach, 'radarUpdatedByCoach'),
    get(dataBioCoach, 'playerRadarSkills'),
  ])

  return (
    <>
      <Head>
        <title>
          {get(dataBioCoach, 'firstName') + ' ' + get(dataBioCoach, 'lastName')}
        </title>
        <meta name="description" content="Zporter"></meta>
        <meta property="og:url" content="https://www.byeindonesia.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            get(dataBioCoach, 'firstName') + ' ' + get(dataBioCoach, 'lastName')
          }
        />
        <meta property="og:description" content="Zporter" />
        <meta
          property="og:image"
          content={
            get(dataBioCoach, 'faceImageUrl') ||
            'https://images.unsplash.com/photo-1645877409345-0389b63d382d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
          }
        />
      </Head>
      <div className="mobileM:px-[16px] laptopM:px-[60px] pt-[18px]">
        <Tabs
          indicatorColor="secondary"
          //@ts-ignore: Unreachable code error
          onChange={handleTabsChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="secondary"
          value={currentTab}
          sx={{ display: authenticated ? 'block' : 'none' }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </div>
      {isDesktop && <Divider sx={{ mb: 3, borderBottomWidth: 0 }} />}
      <div className="mobileM:px-[16px] laptopM:px-[60px] laptopM:mb-11">
        {currentTab === 'biography' && (
          <div>
            {/* /// Navigate and filter */}
            <NavigationAndFilter
              username={dataBioCoach.username}
            ></NavigationAndFilter>

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
                  <InfoCoachWithCircleImage
                    dataBio={dataBioCoach}
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
                  {/* todo */}
                  <InfoCoachWithAChart
                    profile={profile}
                    dataBio={dataBioCoach}
                    dataBioRadarChart={dataBioCoachRadarChart}
                  ></InfoCoachWithAChart>

                  <div className="h-[1px] my-[32px] bg-Stroke "></div>

                  <InforWithNumbers
                    dataClub={dataClub}
                    activeSeasons={dataBioCoach.activeSeasons}
                    router={router}
                  />
                </div>
              </div>
            </div>

            {/*  */}
            <div className="mt-[30px] ">
              <SocialLinksComponent socialLinks={dataBioCoach.socialLinks} />
            </div>

            {/* <TopVideos dataBio={dataBioCoach} /> */}
            {/*  */}
          </div>
        )}
        {currentTab === 'update' && <UpdateBiography />}
        {/* {currentTab === 'profile' && <Profile />} */}
      </div>
    </>
  )
}

// Biography.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>
export const getServerSideProps: any = async ({ req, res, query }) => {
  // const roleId =
  const uid = await loadIdToken(req as any)

  const fullname = query.fullname // not use
  const username: string = query.username

  const lastCharacter = username[username.length - 1]

  let error: boolean
  let dataBioPlayer: IBiographyPlayer
  let dataBioCoach: IBiographyCoach
  let dataClub: IInfoClub
  let dataAvgPlayer: IAvgPlayerScore
  let dataAvgCoach: IAvgCoachScore

  const fetcher1 = async (url) => {
    if (url === null) return
    //@ts-ignore: Unreachable code error
    axios.defaults.headers.username = username
    const roleId = parseCookies(req)[COOKIE_KEY.roleid]
    if (!isEmpty(roleId)) {
      //@ts-ignore: Unreachable code error
      axios.defaults.headers.roleId = roleId
    }
    const data = await axios.get(url)
    if (data.status === 200) {
      return data.data
    }
    return { error: true }
  }

  const axios = axiosLib.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  })
  //@ts-ignore: Unreachable code error
  axios.defaults.headers.username = username
  const roleId = parseCookies(req)[COOKIE_KEY.roleid]
  if (!isEmpty(roleId)) {
    //@ts-ignore: Unreachable code error
    axios.defaults.headers.roleId = roleId
  }

  const promiseDataBioPlayer =
    lastCharacter === 'C'
      ? null
      : axios.get(`/biographies/player?username=${username}`)

  const promiseDataBioCoach =
    lastCharacter === 'C'
      ? axios.get(`/biographies/coach?username=${username}`)
      : null

  // console.log('aaa p1', p1.data)
  // this endpoin can be used for both player or coach
  const promiseDataClub = axios.get(
    `/biographies/player/clubs?limit=20&startAfter=0&sorted=asc&username=${username}&type=HISTORIC`
  )
  // console.log('aaa p2', p2.data)
  const promiseDataAvgPlayer =
    lastCharacter === 'C' ? null : axios.get(`/biographies/players/avg-radar`)

  const promiseDataAvgCoach =
    lastCharacter === 'C' ? axios.get(`/biographies/coaches/avg-radar`) : null

  // console.log('aaa p3', p3.data)

  ///////////////////////////////////////////////

  try {
    const [data1, data2, data3, data4, data5] = await Promise.all([
      promiseDataBioPlayer,
      promiseDataBioCoach,
      promiseDataClub,
      promiseDataAvgPlayer,
      promiseDataAvgCoach,
    ])
    dataBioPlayer = get(data1, 'data') || null
    dataBioCoach = get(data2, 'data') || null
    dataClub = get(data3, 'data') || null
    dataAvgPlayer = get(data4, 'data') || null
    dataAvgCoach = get(data5, 'data') || null
    error = false
    console.log('aaa no error')
  } catch (err) {
    console.log('aaa error', getErrorMessage(err))
      //@ts-ignore: Unreachable code error
      ;[dataBioPlayer, dataBioCoach, dataClub, dataAvgPlayer, dataAvgCoach] = [
        null,
        null,
        null,
        null,
        null,
      ]
    error = true
  }

  ///////////////////////////////////////////////

  return {
    props: {
      dataBioPlayer,
      dataBioCoach,
      dataClub,
      dataAvgPlayer,
      dataAvgCoach,
      error,
      profile: lastCharacter === 'C' ? 'coach' : 'player',
    },
  }
}
// ;(async function () {
//   const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('successsss')
//     }, 2000)
//   })
//   const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject('errorrrrr')
//     }, 3000)
//   })

//   const values = await Promise.allSettled([p1, p2])
//   debugger
// })()
