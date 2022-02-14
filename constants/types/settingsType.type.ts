export type AccountType = {
  email: string
  isActive: boolean
  isVerified: boolean
  verifyCode: string
}

export type ContractedClub = {
  city: string
  clubId: string
  clubName: string
  logoUrl: string
}

export type CoachCareerType = {
  clubId: string
  contractedClub: ContractedClub
  contractedFrom: string
  contractedUntil: string
  currentTeams: string[]
  expLevel: string
  highestCoachingEducation: string
  managementStyle: string
  managementType: string
  role: string
  summary: string
}

export type OverallType = {
  mental: number
  physics: number
  tactics: number
  technics: number
}

export type RadarType = {
  analytics: number
  attacking: number
  defending: number
  playerDevelopment: number
  setPieces: number
  turnovers: number
}

export type HealthType = {
  height: {
    value: number
  }
  leftFootLength: number
  rightFootLength: number
  weight: {
    value: number
  }
}

export type MediaType = {
  bodyImage: string
  faceImage: string
  teamImage: string
  videoLinks: string[]
}

export type CountryType = {
  alpha2Code: string
  alpha3Code: string
  phoneCode?: string
  flag: string
  name: string
  region: string
}

export type ProfileType = {
  birthCountry: CountryType
  birthDay: string
  city: string
  email: string
  firstName: string
  fullName: string[]
  gender: string
  homeAddress: string
  lastName: string
  phone: string
  postNumber: string
  region: string
}

export type NotificationsType = {
  feedUpdates: boolean
  inviteUpdates: boolean
  messageUpdates: boolean
  profileAndDiaryUpdates: boolean
}

export type SettingsType = {
  country: CountryType
  language: string
  notificationOn: boolean
  notificationOptions: NotificationsType
  public: boolean
}

export type SocialLinksType = {
  facebook: string
  instagram: string
  tiktok: string
  twitter: string
  veoHighlites: string
  youtube: string
}

export type CoachSkillsType = {
  overall: OverallType
  radar: RadarType
  specialityTags: string[]
}

export type AccountSettingsType = Partial<{
  account: AccountType
  circleCompleted: number
  coachCareer: CoachCareerType
  coachSkills: CoachSkillsType
  fcmToken: string[]
  health: HealthType
  ips: string[]
  isOnline: boolean
  lastActive: number
  media: MediaType
  profile: ProfileType
  settings: SettingsType
  socialLinks: SocialLinksType
  timezone: string
  type: string
  uid: string
  userId: string
  username: string
}>
