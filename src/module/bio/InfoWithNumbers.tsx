import { useContext, useEffect, useMemo, useState } from 'react'
import queryString from 'query-string'
import { Text } from 'src/components/Text'
import { TitleCollapse } from 'src/components/common/TitleCollapse'
import { TabPanel, Tabs } from 'src/components/Tabs'
import { IInfoClub, InfoClub } from './InfoClub'
import useSWR from 'swr'
import { fetcher } from 'src/utils/utils'
import { isEmpty } from 'lodash'
import { NextRouter } from 'next/router'
import { CircularProgress } from '@mui/material'
import { useAtom } from 'jotai'
import { dataStatsAtom } from 'src/atoms/biographyAtom'

enum Tab {
  Club = 'Club',
  Total = 'Total',
  '20/19' = '20/19',
  '19/18' = '19/18',
  '18/17' = '18/17',
}

// const tabs = [
//   { text: Tab.Club },
//   { text: Tab.Total },
//   { text: Tab['20/19'] },
//   { text: Tab['19/18'] },
//   { text: Tab['18/17'] },
// ]

// Generated by https://quicktype.io

export interface IDataStats {
  statsItems: StatsItem[]
  matchInTotalStatistic: MatchInTotalStatistic
  trainingInTotalStatistics: TrainingInTotalStatistics
  topVideoLinks: TopVideoLink[]
  playerRadarSkills: PlayerRadarSkills
  radarUpdatedByCoach: PlayerRadarSkills
  specialities: string[]
  leftFoot: number
  rightFoot: number
  totalTrophies: TotalTrophies
  totalAwards: TotalAwards
  totalCaps: TotalCap[]
}

export interface MatchInTotalStatistic {
  hours: number
  matches: number
  points: number
  goals: number
  assists: number
  yel: number
  red: number
}

export interface PlayerRadarSkills {
  pace: number
  tackling: number
  defending: number
  passing: number
  attacking: number
  dribbling: number
  shooting: number
  heading: number
}

export interface StatsItem {
  title: string
  value: string
  arrow?: string
}

export interface TopVideoLink {
  url: string
  thumbnailUrl: string
  source: string
}

export interface TotalAwards {
  MVP: number
  POW: number
  SOM: number
  POM: number
  POY: number
  DT: number
  GOL: number
  GOC: number
}

export interface TotalCap {
  type: string
  teamName: string
  count: number
}

export interface TotalTrophies {
  serieTrophyCount: number
  cupTrophyCount: number
  otherTrophyCount: number
}

export interface TrainingInTotalStatistics {
  trainingCategory: TrainingCategory
  sessions: number
  hours: number
}

export interface TrainingCategory {
  technical: number
  tactics: number
  mental: number
  physical: number
}

export const InforWithNumbers = ({
  dataClub,
  activeSeasons,
  router,
}: {
  dataClub: IInfoClub
  activeSeasons: string[]
  router?: NextRouter
}) => {
  const [dataStats, setDataStats] = useAtom(dataStatsAtom)
  const { username } = router.query
  const [tab, setTab] = useState('Total')
  const [urlGetSeasonStats, setUrlGetSeasonStats] = useState('')
  const { data, error } = useSWR(urlGetSeasonStats, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  }) as {
    data: IDataStats
    error: any
  }

  useEffect(() => {
    //@ts-ignore: Unreachable code error
    setDataStats(data)
  }, [data])

  const tabs = useMemo(() => {
    return [
      { text: 'Club' },
      { text: 'Total' },
      ...(isEmpty(activeSeasons) ? [] : activeSeasons).map((o) => ({
        text: o,
      })),
    ]
  }, [activeSeasons])

  useEffect(() => {
    const getSeason = (tab) => {
      if (tab === 'Club') {
        return ''
      }
      return tab
    }
    const season = getSeason(tab)

    let params: any = {}
    params.username = username
    params.limit = 20
    params.startAfter = 0
    params.sorted = 'asc'

    if (season === 'Total') {
      params.statsTab = 'Total'
    } else {
      params.statsTab = 'Past_Season'
      params.season = season
      params.startDate = `${season}-01-01`
      params.endDate = `${season}-12-30`
    }

    setUrlGetSeasonStats(
      `/biographies/player/stats?${queryString.stringify(params)}`
    )
  }, [tab])

  const renderStats = () => {
    if (error) {
      return (
        <TabPanel visible={tab !== 'Club'}>
          <div className="hidden ">Error</div>
        </TabPanel>
      )
    }

    if (isEmpty(data)) {
      return (
        <TabPanel visible={tab !== 'Club'}>
          <div className="flex justify-center mt-[20px]  ">
            <CircularProgress />
          </div>
        </TabPanel>
      )
    }

    const { statsItems, matchInTotalStatistic, trainingInTotalStatistics } =
      data
    return (
      <TabPanel visible={tab !== 'Club'}>
        <TitleCollapse title={'STATS'} alwayShowContent={false}>
          <>
            <div className="mt-[12px] mb-[36px]  ">
              <div className="flex mb-2 gap-x-[8px] justify-center ">
                {(statsItems || []).slice(0, 4).map((o, index) => (
                  <OneRowStat
                    key={index}
                    title={o.title}
                    value={o.title === 'Play Time' ? o.value + '%' : o.value}
                  />
                ))}
              </div>

              <div className="flex mb-2 gap-x-[8px] justify-center ">
                {(statsItems || []).slice(4, 8).map((o, index) => (
                  <OneRowStat
                    key={index}
                    title={o.title}
                    value={o.title === 'Play Time' ? o.value + '%' : o.value}
                  />
                ))}
              </div>
            </div>

            <div className="h-[16px] "></div>
            <Text
              name="Subtitle1"
              className="text-white mb-[12px] text-center "
            >
              Matches in total
            </Text>

            <div className="flex gap-x-[12px] xl:gap-x-[30px] overflow-x-auto pb-1 justify-center">
              {[
                {
                  label: 'Matches',
                  value: matchInTotalStatistic?.matches || 0,
                },
                {
                  label: 'Hours',
                  value: (matchInTotalStatistic?.hours || 0).toFixed(1),
                },
                {
                  label: 'Point',
                  value: (matchInTotalStatistic?.points || 0).toFixed(1),
                },
                { label: 'Goals', value: matchInTotalStatistic?.goals || 0 },
                {
                  label: 'Assists',
                  value: matchInTotalStatistic?.assists || 0,
                },
                { label: 'Yel', value: matchInTotalStatistic?.yel || 0 },
                { label: 'Red', value: matchInTotalStatistic?.red || 0 },
              ].map((o, index) => (
                <Match key={index} title={o.label} value={o.value} />
              ))}
            </div>

            <div className="h-[40px] "></div>
            <Text
              name="Subtitle1"
              className="text-white mb-[12px] text-center "
            >
              Trainings in total
            </Text>

            <div className="flex gap-x-[12px] xl:gap-x-[30px] overflow-x-auto pb-1 justify-center ">
              {[
                {
                  label: 'Sessions',
                  value: trainingInTotalStatistics.sessions,
                },
                { label: 'Hours', value: trainingInTotalStatistics.hours },
                {
                  label: 'Technic',
                  value: trainingInTotalStatistics.trainingCategory.technical,
                },
                {
                  label: 'Tactic',
                  value: trainingInTotalStatistics.trainingCategory.tactics,
                },
                {
                  label: 'Physic',
                  value: trainingInTotalStatistics.trainingCategory.physical,
                },
                {
                  label: 'Mental',
                  value: trainingInTotalStatistics.trainingCategory.mental,
                },
              ].map((o, index) => (
                <Match key={index} title={o.label} value={o.value} />
              ))}
            </div>
          </>
        </TitleCollapse>
      </TabPanel>
    )
  }

  return (
    <>
      <div className="pl-[16px] h-[48px] mb-[24px] flex items-center ">
        <div className=" mt-[22px] ">
          <Tabs tab={tab} setTab={setTab} tabs={tabs} />
        </div>
      </div>
      <TabPanel visible={tab === 'Club'}>
        <InfoClub dataClub={dataClub} />
      </TabPanel>
      {renderStats()}
    </>
  )
}

export const OneRowStat = ({ title, value }: { title: any; value: any }) => {
  return (
    <div
      className="
                p-[6px] sm:p-[8px] xl:p-[12px]
              bg-[#1f1f1f] rounded-[8px] flex flex-col justify-center items-center "
    >
      <Text name="Subtitle2" className="text-Grey mb-[4px] ">
        {title}
      </Text>
      <Text name="Header6" className="text-white ">
        {value}
      </Text>
    </div>
  )
}

const Match = ({ title, value }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className=" text-[13px] xl:text-[16px] leading-[150%] text-Grey mb-2 ">
        {title}
      </span>
      <span className="text-white text-[15px] xl:text-[24px] leading-[138%] font-semibold">
        {value}
      </span>
    </div>
  )
}
