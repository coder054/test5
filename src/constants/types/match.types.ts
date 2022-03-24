import { CountryType } from '../types'
import { MemberType } from './member.typs'
import { ClubType, TeamType } from './settingsType.type'

export type MatchType = Partial<{
  events: EventType[]
  country: CountryType
  dateTime: string | Date
  length: number
  result: ResultType
  club: ClubType
  arena: string
  mvp: MvpType
  review: ReviewType
  typeOfGame: string
  opponentClub: ClubType
  opponentTeam: TeamType
  matchMedia: any[]
  place: string
  stats: StatType[]
  yourTeam: TeamType
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

export type MvpType = {
  yourTeam: MemberType
  opponents: MemberType
}
