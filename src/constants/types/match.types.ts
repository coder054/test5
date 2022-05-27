import { CountryType } from '../types'
import { MemberType } from './member.types'
import { ClubType, TeamType } from './settingsType.type'

export type MatchType = Partial<{
  events: EventType[]
  country: CountryType | null
  dateTime: string | Date
  length: number
  result: ResultType
  club: ClubType | null
  arena: string
  mvp: MvpType | null
  review: ReviewType
  typeOfGame: string
  opponentClub: ClubType | null
  opponentTeam: TeamType | null
  matchMedia: any[]
  place: string
  stats: StatType[]
  yourTeam: TeamType | null
  teamMatchReview: string
  physicallyStrain: string
}>

export type EventType = {
  event: string
  minutes: number
}

export interface ResultType {
  yourTeam: number
  opponents: number
}

export interface ReviewType {
  yourReview: string
  physicallyStrain: string
  teamReview: string
  teamPerformance: string
  playerPerformance: string
}

export type StatType = {
  minutesPlayed: number
  role: string
}

export type MvpType = Partial<{
  yourTeam: MemberType
  opponents: MemberType
}>

export type MatchesTableType = {
  matchStatisticAverage: {
    totalMatchType: TotalMatchType
    netScore: number
    averagePoint: number
    averagePlayingTime: number
    averageGoal: number
    averageAssist: number
    averageCard: number
    role: string
  }
  matchInTotalStatistic: MatchInTotalStatisticType
}

export type TotalMatchType = {
  cupMatch: number
  friendlyMatch: number
  seriesMatch: number
}

export type MatchInTotalStatisticType = {
  hours: number
  matches: number
  points: number
  goals: number
  assists: number
  yel: number
  red: number
}

export type MatchUpdatesType = {
  createdAt: number
  match: {
    result: {
      opponents: number
      yourTeam: number
    }
    length: number
    events: [
      {
        event: string
        minutes: number
      }
    ]
    opponentClub: {
      clubName: string
      logoUrl: string
      city: string
      clubId: string
    }
  }
  diaryId: string
}
