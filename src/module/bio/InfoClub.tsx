import { useEffect } from 'react'
import { TitleCollapse } from 'src/components/common/TitleCollapse'

export interface IInfoClub {
  historicClubs: HistoricClub[]
  existingClub: ExistingClub
  futureClubs: any[]
}

export interface ExistingClub {
  clubInfo: ClubInfo
  statsItems: StatsItem[]
  matchInTotalStatistic: MatchInTotalStatistic
  trophies: Trophies
  summary: string
  mediaLinks: any[]
}

export interface ClubInfo {
  club: Club
  team: Team
  fromTime: string
  toTime: string
  league: League
  role: string
}

export interface Club {
  clubId: string
  city: string
  clubName: string
  arena: string
  logoUrl: string
  websiteUrl: null | string
  country: string
  nickName?: string
}

export interface League {
  name: string
}

export interface Team {
  clubId: string
  teamName: string
}

export interface MatchInTotalStatistic {
  matches: number
  hours: number
  points: number
  goals: number
  assists: number
  yel: number
  red: number
}

export interface StatsItem {
  title: string
  value: string
}

export interface Trophies {
  serieTrophyCount: number
  cupTrophyCount: number
  otherTrophyCount: number
}

export interface HistoricClub {
  careerId: string
  clubInfo: ClubInfo
  statsItems: StatsItem[]
  matchInTotalStatistic: MatchInTotalStatistic
  trophies: Trophies
  summary: string
  mediaLinks: any[]
  season: string
}

export const InfoClub = ({ dataClub }: { dataClub: IInfoClub }) => {
  useEffect(() => {
    console.log('aaa dataClub: ', dataClub)
  }, [dataClub])
  return (
    <div className="">
      <div className="text-Grey text-[15px] font-medium ">Historic</div>

      {dataClub.historicClubs.map((historicClub) => {
        return (
          <TitleCollapse
            title={''}
            alwayShowContent={<div className="text-white ">test</div>}
          >
            <div className="border p-10 "></div>
          </TitleCollapse>
        )
      })}

      <div className="text-Grey text-[15px] font-medium ">Existing</div>
      <div className="text-Grey text-[15px] font-medium ">Future</div>
    </div>
  )
}
