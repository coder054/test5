import { CountryType } from '../types'
import { ClubType } from './settingsType.type'

export type MatchType = Partial<{
  events: EventType[]
  country: CountryType
  dateTime: string | Date
  length: number
  result: ResultType
  club: ClubType
  arena: string
  mvp: string
  review: ReviewType
  typeOfGame: string
  opponentClub: ClubType
  matchMedia: any[]
  place: string
  stats: StatType[]
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
