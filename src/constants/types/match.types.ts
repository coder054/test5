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

const obj = {
  length: 90,
  review: {
    teamPerformance: 'NORMAL',
    teamReview: '',
    physicallyStrain: 'NORMAL',
    playerPerformance: 'NORMAL',
    yourReview: '',
  },
  stats: [],
  typeOfGame: '',
  dateTime: '',
  matchMedia: [],
  mvp: {},
  arena: '',
  events: [],
  opponentClub: {
    clubName: '',
    fromTime: null,
    websiteUrl: null,
    contractedUntil: null,
    city: null,
    logoUrl: '',
    toTime: null,
    country: null,
    clubId: '',
  },
  result: {
    opponents: 0,
    yourTeam: 0,
  },
  club: {
    fromTime: null,
    clubName: '',
    websiteUrl: null,
    toTime: null,
    country: null,
    logoUrl: '',
    city: null,
    clubId: '',
    contractedUntil: null,
  },
  place: '',
  country: {
    alpha3Code: '',
    name: '',
    phoneCode: '',
    region: '',
    flag: '',
    alpha2Code: '',
  },
}
