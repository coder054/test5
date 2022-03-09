export interface Health {
  height?: {
    value: number
    updatedAt: string
  }
  weight?: {
    value: number
    updatedAt: string
  }
  leftFootLength?: number
  rightFootLength?: number
}

export interface VideoLink {
  url: string
  source: string
  thumbnailUrl: string
}

export interface Media {
  faceImage?: string
  bodyImage?: string
  teamImage?: string
  videoLinks?: string[]
}

export interface Profile {
  phone?: string
  firstName?: string
  lastName?: string
  gender?: string
  birthCountry?: {
    name: string
    alpha2Code: string
    alpha3Code: string
    region: string
    flag: string
    phoneCode: string
  }
  birthDay?: string
  homeAddress?: string
  postNumber?: string
  region?: string
  city?: string
}

export interface Settings {
  country?: {
    name: string
    alpha2Code: string
    alpha3Code: string
    region: string
    flag: string
    phoneCode: string
  }
  language?: string
  public?: boolean
  notificationOn?: boolean
  notificationOptions?: {
    profileAndDiaryUpdates: boolean
    feedUpdates: boolean
    messageUpdates: boolean
    inviteUpdates: boolean
  }
}

export interface SocialLinks {
  instagram?: string
  facebook?: string
  twitter?: string
  youtube?: string
  veoHighlites?: string
  tiktok?: string
}

export interface PlayerCareer {
  clubId?: string
  contractedFrom?: string
  contractedUntil?: string
  acceptedTeamIds?: string[]
  pendingTeamIds?: string[]
  favoriteRoles?: string[]
  shirtNumber?: number
  summary?: string
  teamCalendarLinks?: []
  seasonStartDate?: string
  seasonEndDate?: string
  estMarketValue?: number
}

export interface CoachCareer {
  clubId: string
  contractedFrom: string
  contractedUntil: string
  seasonStartDate: string
  seasonEndDate: string
  acceptedTeamIds: string[]
  pendingTeamIds: string[]
  role: string
  highestCoachingEducation: string
  expLevel: string
  managementStyle: string
  managementType: string
  summary: string
}

export interface PlayerSkills {
  specialityTags?: string[]
  overall?: {
    mental: number
    physics: number
    tactics: number
    technics: number
    leftFoot: number
    rightFoot: number
  }
  radar?: {
    attacking: number
    defending: number
    dribbling: number
    passing: number
    shooting: number
    pace: number
    tackling: number
    heading: number
  }
}

export interface CoachSkills {
  specialityTags: []
  overall: {
    mental: number
    physics: number
    tactics: number
    technics: number
  }
  radar: {
    attacking: number
    defending: number
    turnovers: number
    setPieces: number
    analytics: number
    playerDevelopment: number
  }
}

export type ProfilePlayerType = Partial<{
  health: Health
  media: Media
  profile: Profile
  settings: Settings
  socialLinks: SocialLinks
  playerCareer: PlayerCareer
  playerSkills: PlayerSkills
}>

export type ProfileCoachType = Partial<{
  health: Health
  media: Media
  profile: Profile
  settings: Settings
  socialLinks: SocialLinks
  coachCareer: CoachCareer
  coachSkills: CoachSkills
}>
