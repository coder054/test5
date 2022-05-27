export interface FriendTagsType {
  isActive?: boolean
  birthCountry?: {
    alpha2Code?: string
    alpha3Code?: string
    flag?: string
    name?: string
    region?: string
  }
  fullName?: string
  clubId?: string
  firstName?: string
  fcmToken?: []
  favoriteRoles?: []
  currentTeams?: []
  lastName?: string
  faceImage?: string
  username?: string
  type?: string
  userId?: string
  teamIds?: []
  isOnline?: boolean
  clubName?: string
  timezone?: string
  lastActive?: number
  birthDay?: string
  createdAt?: number
  updatedAt?: number
  shirtNumber?: null
  gender?: string
  weight?: number
  height?: number
  fatherHeight?: number
  motherHeight?: number
  age?: number
  isPublic?: boolean
  notificationOn?: boolean
  notificationOptions?: {
    feedUpdates?: boolean
    inviteUpdates?: boolean
    messageUpdates?: boolean
    profileAndDiaryUpdates?: boolean
  }
}

/////
export interface CardFeedType {
  countComments?: number
  countLikes?: number
  postId?: string
  typeOfPost?: string
  isSaved?: boolean
  isLiked?: boolean
  userId?: string
  typeOfDiary?: string
  updatedAt?: number
  energyLevel?: string
  eatAndDrink?: string
  sleep?: string
  training?: Training
  createdAt?: number
  injuries?: {
    injuryArea: string
    value: number
    isFront: boolean
    total: number
    description: string
  }[]

  sleepChart?: number[]
  eatChart?: number[]
  energyChart?: number[]
  trainingCategory?: TrainingCategory
  injuriesTrending?: any[]
  injuryTags?: string[]
  injuryPain?: string
  diaryType?: string
  averagePainColumnChart?: AveragePainColumnChart
  userInfo?: {
    email?: string
    isActive?: boolean
    birthCountry?: {
      flag?: string
      phoneCode?: string
      alpha3Code?: string
      region?: string
      name?: string
      alpha2Code?: string
    }
    fullName?: string
    clubId?: string
    firstName?: string
    fcmToken?: string[]
    city?: string
    favoriteRoles?: string[]
    currentTeams?: string[]
    lastName?: string
    faceImage?: string
    username?: string
    type?: string
    userId?: string
    teamIds?: string[]
    isOnline?: boolean
    clubName?: string
    timezone?: string
    lastActive?: number
    birthDay?: string
    createdAt?: number
    updatedAt?: number
    shirtNumber?: number
    gender?: string
    weight?: number
    height?: number
    fatherHeight?: number
    motherHeight?: number
    age?: number
    isPublic?: true
    notificationOn?: true
    notificationOptions?: {
      inviteUpdates?: true
      feedUpdates?: true
      profileAndDiaryUpdates?: true
      messageUpdates?: true
    }
  }

  location?: string
  friendTags?: FriendTagsType[]
  text?: string
  headline?: string
  mediaLinks?: {
    type?: string
    url?: string
    uniqueKey?: string
  }[]

  bioInfo: BioInfoType
  matchStats?: MatchStats
  match?: MatchType
  content?: string
  data?: {
    day: number
    type: string
  }[]
  originalDiaryId?: string
  transferId?: string
  transferInfo?: TransferInfoType
  lastDateRange?: string
  country?: string
  category?: string
  description?: string
  progress?: number
  wins?: number
  sessions?: number
  assists: number
  hours: number
  goals: number
  title: string
  ztar: number
}

export interface TransferInfoType {
  newClub: {
    clubLogo: string
    clubName: string
    from: string
    to: string
  }

  oldClub: {
    clubName: string
    clubLogo: string
    from: string
    to: string
  }
  transferFee: string
  typeOfPost: string
  updatedAt: number
  userId: string
}

export interface MatchType {
  arena: string
  club: any
  country: any
  dateTime: string
  events: any
  length: number
  matchMedia: any
  mvp: any
  opponentClub: any
  place: string
  result: { opponents: number; yourTeam: number }
  review: any
  stats: { minutesPlayed: number; role: string }[]
  typeOfGame: string
  yourTeam: {
    clubId: string
    clubLogo: string
    clubName: string
    teamId: string
    teamImage: string
    teamName: string
  }
}

export interface MatchStats {
  assists: number
  goals: number
  playingTime: number
  redCard: number
  role: string
  yellowCard: number
}

export interface AveragePainColumnChart {
  injuryAreaF: number[]
  injuryAreaB: number[]
}

export interface Training {
  physicallyStrain: string
  teamReview: string
  hoursOfPractice: number
  tactics: number
  trainingMedia: any[]
  typeOfTraining: string
  practiceTags: any[]
  yourPerformance: string
  teamPerformance: string
  technics: number
  teamPhysicallyStrain: string
  trainingReview: string
  mental: number
  yourPhysicallyStrain: string
  physics: number
}

export interface TrainingCategory {
  technical: number
  tactics: number
  mental: number
  physical: number
}

export interface UserInfo {
  email: string
  isActive: boolean
  birthCountry: BirthCountry
  fullName: string
  clubId: string
  firstName: string
  fcmToken: string[]
  city: string
  favoriteRoles: string[]
  currentTeams: string[]
  lastName: string
  faceImage: string
  username: string
  type: string
  userId: string
  teamIds: string[]
  isOnline: boolean
  clubName: string
  timezone: string
  lastActive: number
  birthDay: Date
  createdAt: number
  updatedAt: number
  shirtNumber: number
  gender: string
  weight: number
  height: number
  fatherHeight: number
  motherHeight: number
  age: number
  isPublic: boolean
  notificationOn: boolean
  notificationOptions: NotificationOptions
}

export interface BirthCountry {
  region: string
  alpha3Code: string
  name: string
  alpha2Code: string
  flag: string
}

export interface NotificationOptions {
  messageUpdates: boolean
  profileAndDiaryUpdates: boolean
  inviteUpdates: boolean
  feedUpdates: boolean
}

//

export interface BioInfoType {
  age: number
  bestFoot: string
  bioUrl: string
  birthDay: string
  bodyImageUrl: string
  circleCompleted: number
  contractedUntil: string
  countryFlagUrl: string
  createdAt: number
  currentClubIconUrl: string
  estMarketValue: number
  faceImageUrl: string
  firstName: string
  height: number
  isPublic: boolean
  lastName: string
  lastUpdatedDate: Date
  leftFoot: number
  playerRadarSkills: PlayerRadarSkills
  position: string
  radarUpdatedByCoach: PlayerRadarSkills
  rightFoot: number
  socialLinks: SocialLinks
  specialities: string[]
  starRating: number
  summary: string
  teamIds: string[]
  topVideoLinks: TopVideoLink[]
  typeOfPost: string
  updatedAt: number
  userId: string
  userRole: string
  username: string
  weight: number
  postId: string
  fanCount: number
  followCount: number
  friendCount: number
  countLikes?: number
  countComments?: number
}

export interface PlayerRadarSkills {
  attacking: number
  defending: number
  dribbling: number
  heading: number
  pace: number
  passing: number
  shooting: number
  tackling: number
}

export interface SocialLinks {
  facebook: string
  instagram: string
  tiktok: string
  twitter: string
  veoHighlites: string
  youtube: string
}

export interface TopVideoLink {
  source: string
  thumbnailUrl: string
  url: string
}
