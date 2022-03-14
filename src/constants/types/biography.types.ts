export enum EStatusRelationShip {
  no_relationship = 'no_relationship',
  requested = 'requested',
  response = 'response',
  accepted = 'accepted',
  rejected = 'rejected',
  follow_back = 'follow_back',
  own_requested = 'own_requested',
}

export interface IBiographyPlayer {
  friendStatus?: EStatusRelationShip
  followStatus?: string
  isConfirmBox?: boolean
  isFollowed?: boolean
  friendCount?: number
  followCount?: number
  fanCount?: number
  userId: string
  lastUpdatedDate?: string
  username: string
  firstName: string
  lastName: string
  faceImageUrl: string
  bodyImageUrl: string
  starRating?: number
  circleCompleted?: number
  position?: string
  currentClubIconUrl?: string
  contractedUntil: string
  estMarketValue?: number
  leftFoot: number
  rightFoot: number
  bestFoot?: string
  height: number
  weight: number
  countryFlagUrl?: string
  birthDay: string
  age?: number
  summary: string
  socialLinks?: SocialLinks
  topVideoLinks?: TopVideoLink[]
  playerRadarSkills?: PlayerRadarSkills
  radarUpdatedByCoach?: PlayerRadarSkills
  specialities: any[]
  isPublic?: boolean
  userRole?: string
  bioUrl?: string
  activeSeasons?: string[]
}

export interface PlayerRadarSkills {
  defending: number
  tackling: number
  passing: number
  dribbling: number
  attacking: number
  pace: number
  heading: number
  shooting: number
}

export interface SocialLinks {
  veoHighlites: string
  facebook: string
  instagram: string
  twitter: string
  tiktok: string
  youtube: string
}

export interface TopVideoLink {
  thumbnailUrl: string
  url: string
  source: string
}

export interface IAvgPlayerScore {
  avgPlayerAttacking: number
  avgPlayerDefending: number
  avgPlayerDribbling: number
  avgPlayerPace: number
  avgPlayerPassing: number
  avgPlayerShooting: number
  avgPlayerTackling: number
  avgPlayerHeading: number
}

export interface IFlipPlayer {
  userId: string
  lastUpdatedDate: string
  username: string
  firstName: string
  lastName: null | string
  faceImageUrl: null | string
  bodyImageUrl: null
  starRating: number | null
  circleCompleted: number
  position: null | string
  currentClubIconUrl?: string
  contractedUntil: string
  estMarketValue: number | null
  leftFoot: number
  rightFoot: number
  bestFoot: string
  height: number | null
  weight: number | null
  countryFlagUrl: string
  birthDay: string
  age: number | null
  summary: null | string
  radarUpdatedByCoach: RadarUpdatedByCoach
  isPublic: boolean
  userRole: string
}

export interface RadarUpdatedByCoach {
  attacking: number
  defending: number
  dribbling: number
  passing: number
  shooting: number
  pace: number
  tackling: number
  heading: number
}