/* eslint-disable @next/next/no-img-element */
import { Divider, Tab, Tabs } from '@mui/material'
import { get, isEmpty } from 'lodash'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useMemo } from 'react'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { Loading } from 'src/components/loading/loading'
import { loadIdToken } from 'src/config/firebase-admin'
import { COOKIE_KEY } from 'src/constants/constants'
import {
  IAvgPlayerScore,
  IBiographyPlayer,
} from 'src/constants/types/biography.types'
import { useScreenWidth } from 'src/hooks/useScreenWidth'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { IInfoClub } from 'src/module/bio/InfoClub'
import { InforWithAChart } from 'src/module/bio/InfoWithAChart'
import { InfoWithCircleImage } from 'src/module/bio/InfoWithCircleImage'
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
  dataBio,
  dataClub,
  dataAvgPlayer,
  error,
  profile,
}: {
  dataBio: IBiographyPlayer
  dataClub: IInfoClub
  dataAvgPlayer: IAvgPlayerScore
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

  useEffect(() => {
    const {
      friendStatus,
      followStatus,
      isConfirmBox,
      isFollowed,
      isPublic,
      userId,
    } = dataBio
    console.log('aaa dataBio: ', dataBio, {
      friendStatus,
      followStatus,
      isConfirmBox,
      isFollowed,
      isPublic,
      userId,
    })
  }, [dataBio])

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

  return (
    <DashboardLayout>
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
      <div className="px-[39px] pt-[18px]">
        <Tabs
          indicatorColor="secondary"
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
      <Divider sx={{ mb: 3, borderBottomWidth: 0 }} />
      <div className="px-[16px] xl:px-[39px]">
        {currentTab === 'biography' && (
          <div>
            {/* /// Navigate and filter */}
            <NavigationAndFilter
              username={dataBio.username}
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
                    profile={profile}
                    dataBio={dataBio}
                    dataBioRadarChart={dataBioRadarChart}
                  ></InforWithAChart>

                  <div className="h-[1px] my-[32px] bg-Stroke "></div>

                  <InforWithNumbers
                    dataClub={dataClub}
                    activeSeasons={dataBio.activeSeasons}
                    router={router}
                  />
                </div>
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
                  profile={profile}
                ></InforWithAChart>

                <div className="h-[1px] my-[32px] bg-Stroke "></div>

                <InforWithNumbers
                  dataClub={dataClub}
                  activeSeasons={dataBio.activeSeasons}
                  router={router}
                />
                <div className="mt-[30px] ">
                  <SocialLinksComponent socialLinks={dataBio.socialLinks} />
                </div>

                <div className="h-[32px] "></div>

                <TopVideos dataBio={dataBio} />
              </div>
            </div>
          </div>
        )}
        {currentTab === 'update' && <UpdateBiography />}
        {/* {currentTab === 'profile' && <Profile />} */}
      </div>
    </DashboardLayout>
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
  let dataBio: IBiographyPlayer
  let dataClub: IInfoClub
  let dataAvgPlayer: IAvgPlayerScore

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

  const p1 = axios.get(
    `/biographies/${
      lastCharacter === 'C' ? 'coach' : 'player'
    }?username=${username}`
  )
  // console.log('aaa p1', p1.data)
  const p2 = axios.get(
    `/biographies/player/clubs?limit=20&startAfter=0&sorted=asc&username=${username}&type=HISTORIC`
  )
  // console.log('aaa p2', p2.data)
  const p3 = axios.get(`/biographies/players/avg-radar`)
  // console.log('aaa p3', p3.data)

  ///////////////////////////////////////////////

  try {
    const [data1, data2, data3] = await Promise.all([p1, p2, p3])
    dataBio = data1.data
    dataClub = data2.data
    dataAvgPlayer = data3.data
    error = false
  } catch (err) {
    console.log('aaa error', getErrorMessage(err))
    //@ts-ignore: Unreachable code error
    ;[dataBio, dataClub, dataAvgPlayer] = [{}, {}, {}]
    error = true
  }

  ///////////////////////////////////////////////

  return {
    props: {
      dataBio,
      dataClub,
      dataAvgPlayer,
      error,
      profile: lastCharacter === 'C' ? 'coach' : 'player',
    },
  }
}
