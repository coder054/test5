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
    spot: { x: 98, y: 10 },
    // spot: { x: 10, y: 98 },
  },
  FLH: {
    injuryArea: 'F-L-Head',
    injuryName: 'Front Left Head',
    spot: { x: 117, y: 10 },
    // spot: { x: 10, y: 117 },
  },
  FRA: {
    injuryArea: 'F-R-Arm',
    injuryName: 'Front Right Arm',
    spot: { x: 30, y: 170 },
    // spot: { x: 170, y: 30 },
  },
  FLA: {
    injuryArea: 'F-L-Arm',
    injuryName: 'Front Left Arm',
    spot: { x: 187, y: 170 },
    // spot: { x: 170, y: 187 },
  },
  FRUB: {
    injuryArea: 'F-R-Upper-Body',
    injuryName: 'Front Right Upper Body',
    spot: { x: 90, y: 140 },
    // spot: { x: 140, y: 90 },
  },
  FLUB: {
    injuryArea: 'F-L-Upper-Body',
    injuryName: 'Front Left Upper Body',
    spot: { x: 127, y: 140 },
    // spot: { x: 140, y: 127 },
  },
  FRHIP: {
    injuryArea: 'F-R-Hip',
    injuryName: 'Front Right Hip',
    spot: { x: 82, y: 211 },
    // spot: { x: 211, y: 82 },
  },
  FLHIP: {
    injuryArea: 'F-L-Hip',
    injuryName: 'Front Left Hip',
    spot: { x: 132, y: 211 },
    // spot: { x: 211, y: 132 },
  },
  FRUL: {
    injuryArea: 'F-R-Upper-Leg',
    injuryName: 'Front Right Upper Leg',
    spot: { x: 82, y: 263 },
    // spot: { x: 263, y: 82 },
  },
  FLUL: {
    injuryArea: 'F-L-Upper-Leg',
    injuryName: 'Front Left Upper Leg',
    spot: { x: 134, y: 263 },
    // spot: { x: 263, y: 134 },
  },
  FRK: {
    injuryArea: 'F-R-Knee',
    injuryName: 'Front Right Knee',
    spot: { x: 76, y: 316 },
    // spot: { x: 316, y: 76 },
  },
  FLK: {
    injuryArea: 'F-L-Knee',
    injuryName: 'Front Left Knee',
    spot: { x: 140, y: 316 },
    // spot: { x: 316, y: 140 },
  },
  FRLL: {
    injuryArea: 'F-R-Lower-Leg',
    injuryName: 'Front Right Lower Leg',
    spot: { x: 70, y: 367 },
    // spot: { x: 367, y: 70 },
  },
  FLLL: {
    injuryArea: 'F-L-Lower-Leg',
    injuryName: 'Front Left Lower Leg',
    spot: { x: 144, y: 367 },
    // spot: { x: 367, y: 144 },
  },
  FRF: {
    injuryArea: 'F-R-Foot',
    injuryName: 'Front Right Foot',
    spot: { x: 64, y: 421 },
    // spot: { x: 421, y: 64 },
  },
  FLF: {
    injuryArea: 'F-L-Foot',
    injuryName: 'Front Left Foot',
    spot: { x: 154, y: 421 },
    // spot: { x: 421, y: 154 },
  },
  BLH: {
    injuryArea: 'B-L-Head',
    injuryName: 'Back Left Head',
    spot: { x: 94, y: 24 },
    // spot: { x: 24, y: 94 },
  },
  BRH: {
    injuryArea: 'B-R-Head',
    injuryName: 'Back Right Head',
    spot: { x: 117, y: 24 },
    // spot: { x: 24, y: 117 },
  },
  BLA: {
    injuryArea: 'B-L-Arm',
    injuryName: 'Back Left Arm',
    spot: { x: 33, y: 158 },
    // spot: { x: 158, y: 33 },
  },
  BRA: {
    injuryArea: 'B-R-Arm',
    injuryName: 'Back Right Arm',
    spot: { x: 175, y: 158 },
    // spot: { x: 158, y: 175 },
  },
  BLUB: {
    injuryArea: 'B-L-Upper-Body',
    injuryName: 'Back Left Upper Body',
    spot: { x: 85, y: 140 },
    // spot: { x: 140, y: 85 },
  },
  BRUB: {
    injuryArea: 'B-R-Upper-Body',
    injuryName: 'Back Right Upper Body',
    spot: { x: 127, y: 140 },
    // spot: { x: 140, y: 127 },
  },
  BLHIP: {
    injuryArea: 'B-L-Hip',
    injuryName: 'Back Left Hip',
    spot: { x: 80, y: 210 },
    // spot: { x: 210, y: 80 },
  },
  BRHIP: {
    injuryArea: 'B-R-Hip',
    injuryName: 'Back Right Hip',
    spot: { x: 133, y: 210 },
    // spot: { x: 210, y: 133 },
  },
  BLUL: {
    injuryArea: 'B-L-Upper-Leg',
    injuryName: 'Back Left Upper Leg',
    spot: { x: 78, y: 272 },
    // spot: { x: 272, y: 78 },
  },
  BRUL: {
    injuryArea: 'B-R-Upper-Leg',
    injuryName: 'Back Right Upper Leg',
    spot: { x: 130, y: 272 },
    // spot: { x: 272, y: 130 },
  },
  BLK: {
    injuryArea: 'B-L-Knee',
    injuryName: 'Back Left Knee',
    spot: { x: 75, y: 308 },
    // spot: { x: 308, y: 75 },
  },
  BRK: {
    injuryArea: 'B-R-Knee',
    injuryName: 'Back Right Knee',
    spot: { x: 136, y: 308 },
    // spot: { x: 308, y: 136 },
  },
  BLLL: {
    injuryArea: 'B-L-Lower-Leg',
    injuryName: 'Back Left Lower Leg',
    spot: { x: 68, y: 350 },
    // spot: { x: 350, y: 68 },
  },
  BRLL: {
    injuryArea: 'B-R-Lower-Leg',
    injuryName: 'Back Right Lower Leg',
    spot: { x: 142, y: 350 },
    // spot: { x: 350, y: 142 },
  },
  BLF: {
    injuryArea: 'B-L-Foot',
    injuryName: 'Back Left Foot',
    spot: { x: 60, y: 426 },
    // spot: { x: 426, y: 60 },
  },
  BRF: {
    injuryArea: 'B-R-Foot',
    injuryName: 'Back Right Foot',
    spot: { x: 150, y: 420 },
    // spot: { x: 426, y: 150 },
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

export type Training = Partial<{
  hoursOfPractice: number
  physicallyStrain: string
  physics: number
  tactics: number
  typeOfTraining: string
  mental: number
  technics: number
  practiceTags: any[]
  trainingMedia: any[]
}>

export type MotivationQuote = {
  content: string
  author: string
}

export type PointsType = {
  x: number
  y: number
  name?: string
}

export interface CoachDiaryType {
  typeOfDiary: string
  createdAt: Date
  training: CoachTrainingType
  teamId: string
}

export interface CoachTrainingType {
  physicallyStrain: string
  hoursOfPractice: number
  technics: number
  tactics: number
  physics: number
  mental: number
  practiceTags: string[]
  typeOfTraining: string
  trainingMedia: Media[]
}

export interface Welcome {
  energyLevel: string
  eatAndDrink: string
  sleep: string
  typeOfDiary: string
  userType: string
  cap: Cap
  createdAt: Date
}

export interface CoachCapType {
  dateTime: Date
  country: Country
  typeOfGame: string
  length: number
  place: string
  typeOfCap: string
  yourTeam: string
  opponentCountry: Country
  opponentTeam: string
  arena: string
  result: Result
  review: Review
  capMedia: Media[]
}

export interface Media {
  type: string
  url: string
}
