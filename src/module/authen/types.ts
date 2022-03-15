import { SocialLinks } from 'src/constants/types/profiles.type'

export interface IAvgCoachScore {
  avgCoachAttacking: number
  avgCoachDefending: number
  avgCoachAnalytics: number
  avgCoachSetPieces: number
  avgCoachTurnovers: number
  avgCoachPlayerDevelopment: number
}
interface CoachRadarSkills {
  attacking: number
  playerDevelopment: number
  turnovers: number
  setPieces: number
  defending: number
  analytics: number
}
export interface IBiographyCoach {
  activeSeasons?: string[]
  age?: number
  bioUrl?: string
  birthDay: string
  circleCompleted: number
  coachRadarSkills: CoachRadarSkills
  contractedUntil?: string
  countryFlagUrl?: string
  currentClubIconUrl?: string
  education: string
  expLevel: string
  faceImageUrl: string
  fanCount: number
  firstName: string
  followCount: number
  friendCount: number
  lastName: string
  lastUpdatedDate?: string
  managementStyle?: string
  managementType?: string
  position?: string
  socialLinks: SocialLinks
  specialities: any[]
  starRating: number
  summary: string
  topVideoLinks: []
  userId: string
  userRole: string
  username: string
  isFollowed?: boolean
  estMarketValue?: string
  height?: string
  leftFoot?: number
  rightFoot?: number
}

export interface RequestSigin {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface ResponseSignin {
  kind?: string
  localId?: string
  email?: string
  displayName?: string
  idToken?: string
  registered?: boolean
  refreshToken?: string
  expiresIn?: string
}

export interface OptionType {
  value: string
  label: string
}

//
export const OptionCountry: OptionType[] = [
  { value: 'usa', label: 'USA' },
  { value: 'sweden', label: 'Sweden' },
]

export const OptionUserProfile: OptionType[] = [
  { value: 'player', label: 'Player' },
  { value: 'coach', label: 'Coach' },
]

export const OptionShirtNumber: OptionType[] = [
  { value: 'player', label: 'Player' },
  { value: 'coach', label: 'Coach' },
]

export const OptionPlayer: OptionType[] = [
  {
    value: 'GK',
    label: 'GK - Goalkeeper',
  },
  {
    value: 'CB',
    label: 'CB - Center Back',
  },
  {
    value: 'RB',
    label: 'RB - Right Back',
  },
  {
    value: 'LB',
    label: 'LB - Left Back',
  },
  {
    value: 'CDM',
    label: 'CDM - Central Defending Midfielder',
  },
  {
    value: 'CM',
    label: 'CM - Central Midfielder',
  },
  {
    value: 'CAM',
    label: 'CAM - Central Attacking Midfielder',
  },
  {
    value: 'RM',
    label: 'RM - Right Midfielder',
  },
  {
    value: 'LM',
    label: 'LM - Left Midfielder',
  },
  {
    value: 'CF',
    label: 'CF - Center Forward',
  },
  {
    value: 'ST',
    label: 'ST - Striker',
  },
  {
    value: 'RW',
    label: 'RW - Right Winger',
  },
  {
    value: 'LW',
    label: 'LW - Left Winger',
  },
]

export const OptionCoach: OptionType[] = [
  {
    value: '1',
    label: 'Coach',
  },
  {
    value: '2',
    label: 'Ass Coach',
  },
  {
    value: '3',
    label: 'Head Coach',
  },
  {
    value: '4',
    label: 'GK Coach',
  },
  {
    value: '5',
    label: 'Other',
  },
]
