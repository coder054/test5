import { MatchType } from './match.types'

export type SPOT_KEY =
  | 'FLH'
  | 'FRH'
  | 'FLUB'
  | 'FRUB'
  | 'FLA'
  | 'FRA'
  | 'FLHIP'
  | 'FRHIP'
  | 'FLUL'
  | 'FRUL'
  | 'FLK'
  | 'FRK'
  | 'FLLL'
  | 'FRLL'
  | 'FLF'
  | 'FRF'

export type DiaryResponseType = Partial<{
  data: DiaryType[]
  motivationQuote: MotivationQuote
}>

export type DiaryType = Partial<{
  userId: string
  createdAt: number
  sleep: string
  eatAndDrink: string
  injuries: InjuryType[]
  typeOfDiary: string
  updatedAt: number
  energyLevel: string
  training: Training
  diaryId: string
  cap: Cap
  userType: string
  match: MatchType
}>

export type InjuryType = {
  createdAt: number
  description: string
  diaryId: string
  injuryArea: string
  injuryId?: string
  injuryMedia: InjuryMediaType[]
  injuryPosition: { x: number; y: number }
  injuryTags: string[]
  isFront: boolean
  painLevel: string
  treatment: string
  updatedAt: number
  userId?: string
}

export type InjuryMediaType = {
  type: string
  uniqueKey: string
  url: string
}

export type Cap = {
  length: number
  arena: string
  place: string
  stats: Stat[]
  typeOfGame: string
  opponentCountry: Country
  opponentTeam: string
  dateTime: Date
  yourTeam: string
  capMedia: any[]
  typeOfCap: string
  events: any[]
  result: Result
  review: Review
  country: Country
}

export type Country = {
  flag: string
  name: string
  alpha3Code: string
  alpha2Code: string
  region: string
  phoneCode?: string
}

export type Result = {
  yourTeam: number
  opponents: number
}

export type Review = {
  yourReview: string
  physicallyStrain: string
  teamReview: string
  teamPerformance: string
  playerPerformance: string
}

export type Stat = {
  minutesPlayed: number
  role: string
}

export type Match = {
  matchMedia: any[]
  opponentClub: Club
  stats: Stat[]
  opponentTeam: Team
  mvp: MVP
  club: Club
  country: Country
  dateTime: Date
  place: string
  events: any[]
  review: Review
  yourTeam: Team
  length: number
  arena: string
  typeOfGame: string
  result: Result
}

export type Club = {
  city: null | string
  logoUrl: string
  toTime: null
  clubId: string
  websiteUrl: null
  contractedUntil: null
  country: null
  fromTime: null
  clubName: string
}

export type MVP = {}

export type Team = {
  teamName: string
  clubLogo: string
  teamImage: string
  clubName: string
  teamId: string
  clubId: string
}

export type Training = {
  hoursOfPractice: number
  physicallyStrain: string
  physics: number
  tactics: number
  typeOfTraining: string
  mental: number
  technics: number
  practiceTags: any[]
  trainingMedia: any[]
}

export type MotivationQuote = {
  content: string
  author: string
}
