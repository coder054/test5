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
  | 'BLH'
  | 'BRH'
  | 'BLUB'
  | 'BRUB'
  | 'BLA'
  | 'BRA'
  | 'BLHIP'
  | 'BRHIP'
  | 'BLUL'
  | 'BRUL'
  | 'BLK'
  | 'BRK'
  | 'BLLL'
  | 'BRLL'
  | 'BLF'
  | 'BRF'

export const BODY_PART = {
  FRH: {
    injuryArea: 'F-R-Head',
    injuryName: 'Front Right Head',
  },
  FLH: {
    injuryArea: 'F-L-Head',
    injuryName: 'Front Left Head',
  },
  FRA: {
    injuryArea: 'F-R-Arm',
    injuryName: 'Front Right Arm',
  },
  FLA: {
    injuryArea: 'F-L-Arm',
    injuryName: 'Front Left Arm',
  },
  FRUB: {
    injuryArea: 'F-R-Upper-Body',
    injuryName: 'Front Right Upper Body',
  },
  FLUB: {
    injuryArea: 'F-L-Upper-Body',
    injuryName: 'Front Left Upper Body',
  },
  FRHIP: {
    injuryArea: 'F-R-Hip',
    injuryName: 'Front Right Hip',
  },
  FLHIP: {
    injuryArea: 'F-L-Hip',
    injuryName: 'Front Left Hip',
  },
  FRUL: {
    injuryArea: 'F-R-Upper-Leg',
    injuryName: 'Front Right Upper Leg',
  },
  FLUL: {
    injuryArea: 'F-L-Upper-Leg',
    injuryName: 'Front Left Upper Leg',
  },
  FRK: {
    injuryArea: 'F-R-Knee',
    injuryName: 'Front Right Knee',
  },
  FLK: {
    injuryArea: 'F-L-Knee',
    injuryName: 'Front Left Knee',
  },
  FRLL: {
    injuryArea: 'F-R-Lower-Leg',
    injuryName: 'Front Right Lower Leg',
  },
  FLLL: {
    injuryArea: 'F-L-Lower-Leg',
    injuryName: 'Front Left Lower Leg',
  },
  FRF: {
    injuryArea: 'F-R-Foot',
    injuryName: 'Front Right Foot',
  },
  FLF: {
    injuryArea: 'F-L-Foot',
    injuryName: 'Front Left Foot',
  },
  BLH: {
    injuryArea: 'B-L-Head',
    injuryName: 'Back Left Head',
  },
  BRH: {
    injuryArea: 'B-R-Head',
    injuryName: 'Back Right Head',
  },
  BLA: {
    injuryArea: 'B-L-Arm',
    injuryName: 'Back Left Arm',
  },
  BRA: {
    injuryArea: 'B-R-Arm',
    injuryName: 'Back Right Arm',
  },
  BLUB: {
    injuryArea: 'B-L-Upper-Body',
    injuryName: 'Back Left Upper Body',
  },
  BRUB: {
    injuryArea: 'B-R-Upper-Body',
    injuryName: 'Back Right Upper Body',
  },
  BLHIP: {
    injuryArea: 'B-L-Hip',
    injuryName: 'Back Left Hip',
  },
  BRHIP: {
    injuryArea: 'B-R-Hip',
    injuryName: 'Back Right Hip',
  },
  BLUL: {
    injuryArea: 'B-L-Upper-Leg',
    injuryName: 'Back Left Upper Leg',
  },
  BRUL: {
    injuryArea: 'B-R-Upper-Leg',
    injuryName: 'Back Right Upper Leg',
  },
  BLK: {
    injuryArea: 'B-L-Knee',
    injuryName: 'Back Left Knee',
  },
  BRK: {
    injuryArea: 'B-R-Knee',
    injuryName: 'Back Right Knee',
  },
  BLLL: {
    injuryArea: 'B-L-Lower-Leg',
    injuryName: 'Back Left Lower Leg',
  },
  BRLL: {
    injuryArea: 'B-R-Lower-Leg',
    injuryName: 'Back Right Lower Leg',
  },
  BLF: {
    injuryArea: 'B-L-Foot',
    injuryName: 'Back Left Foot',
  },
  BRF: {
    injuryArea: 'B-R-Foot',
    injuryName: 'Back Right Foot',
  },
}

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

export type InjuryType = Partial<{
  createdAt: number | string | Date
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
}>

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

export type PointsType = {
  x: number
  y: number
  name?: string
}
