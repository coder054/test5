export type AccountType = {
  email: string
  isActive: boolean
  isVerified: boolean
  verifyCode: string
}

export type ContractedClubType = Partial<{
  city: string
  clubId: string
  clubName: string
  logoUrl: string
  arena: string
  country: CountryType | string
  websiteUrl: string | null
}>

export type CoachCareerType = {
  clubId: string
  contractedClub: ContractedClubType
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

export type CurrentTeamType = Partial<{
  clubId: string
  status?: string
  teamId: string
  teamImage: string
  teamName: string
}>

export type PlayerCareerType = Partial<{
  clubId: string
  contractedClub: ContractedClubType
  contractedFrom: string
  contractedUntil: string
  currentTeams: CurrentTeamType[]
  estMarketValue: number
  favoriteRoles: string[]
  seasonEndDate: string
  seasonStartDate: string
  shirtNumber: number
  summary: string
  teamCalendarLinks: string[]
}>

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
  height: { value: number; updateAt: string | Date }
  leftFootLength: number
  rightFootLength: number
  weight: { value: number; updateAt: string | Date }
}

export type VideoLinksType = {
  source?: string
  thumbnailUrl?: string
  url?: string
  id?: string
}

export type MediaType = {
  bodyImage: string
  faceImage: string
  teamImage: string
  videoLinks: VideoLinksType[]
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
  birthCountry?: CountryType
  birthDay?: Date | string | null
  city?: string
  email?: string
  firstName?: string
  fullName?: string[]
  gender?: string
  homeAddress?: string
  lastName?: string
  phone?: string
  postNumber?: string
  region?: string
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

export type ClubType = Partial<{
  arena: string
  city: string
  clubId: string
  clubName: string
  country: CountryType | string
  logoUrl: string
  nickName: string
  websiteUrl: string
  fromTime: string
  toTime: string
  contractedUntil: string
}>

export type TeamType = Partial<{
  teamId: string
  isPrivate: boolean
  updatedAt: number
  synced: boolean
  clubId: string
  clubName: string
  teamImage: string
  teamName: string
  teamNameAsArray: string[]
  createdAt: number
  clubLogo: string
}>

export type CoachSkillsType = {
  overall: OverallType
  radar: RadarType
  specialityTags: string[]
}

export type AccountSettingsType = Partial<{
  account: AccountType
  circleCompleted: number
  coachCareer: CoachCareerType
  playerCareer: PlayerCareerType
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
