export type itemLandingType = {
  idItem?: number
  title?: string
  content?: string
  image: string
}

export type itemEventHeadlineType = {
  avatar?: string
  background?: string
  fullName?: string
  time?: string
  favorite?: number
  comment?: number
  content?: string
  price?: number
}

export interface OptionType {
  label: string
  value: string | number
}

export interface mediaLinksTypes {
  type: string
  uniqueKey: string
  url: string
}

export interface providerInfoType {
  isFollowed?: boolean
  logo?: string
  name?: string
  providerId?: string
  typeOfProvider?: string
  region?: string
}
export interface NewsType {
  countComments?: number
  countLikes?: number
  createdAt?: number
  excerptText?: string
  headline?: string
  hrefId?: string
  isLiked?: boolean
  link?: string
  mediaLinks: mediaLinksTypes[]
  postId?: string
  providerId?: string
  providerInfo?: providerInfoType
  typeOfPost?: string
  updatedAt?: number
}

export type CountryType = {
  alpha2Code: string
  alpha3Code: string
  flag: string
  name: string
  phoneCode: string
  region: string
}

export interface UpdateSkills {
  playerSkills: {
    specialityTags: string[]
    overall: {
      mental: number
      physics: number
      tactics: number
      technics: number
      leftFoot: number
      rightFoot: number
    }
    radar: {
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
  playerCareer: {
    summary: string
  }
}

export interface HeightAndWeightType {
  height: number
  weight: number
  leftFootLength: number
  rightFootLength: number
}
export interface HeightAndWeightBody {
  health: {
    height: {
      value: number
      updatedAt: string
    }
    weight: {
      value: number
      updatedAt: string
    }
    leftFootLength: number
    rightFootLength: number
  }
}

export interface DevelopmentNoteType {
  shortTermGoal?: {
    coachComment: string
    playerContent: string
  }
  updatedAt?: number
  strength?: {
    playerContent: string
    coachComment: string
  }
  createdAt?: number
  bestDevelopSkills?: {
    coachComment: string
    playerContent: string
  }
  playerDevelopmentProgress?: string
  skillsNeededToDevelop?: {
    coachComment: string
    playerContent: string
  }
  weaknesses?: {
    playerContent: string
    coachComment: string
  }
  otherComments?: {
    coachComment: string
    playerContent: string
  }
  bestWayToDevelop?: {
    playerContent: string
    coachComment: string
  }
  playerId?: string
  longTermGoal?: {
    playerContent: string
    coachComment: string
  }
  playerNotedAt?: number
  coachDevelopmentProgress?: string
  devTalkId?: string
}

export interface PlayerCreateDevelopmentNoteType {
  playerDevelopmentProgress?: string
  strength?: {
    playerContent: string
    coachComment: string
  }
  weaknesses?: {
    playerContent: string
    coachComment: string
  }
  bestDevelopSkills?: {
    playerContent: string
    coachComment: string
  }
  skillsNeededToDevelop?: {
    playerContent: string
    coachComment: string
  }
  bestWayToDevelop?: {
    playerContent: string
    coachComment: string
  }
  shortTermGoal?: {
    playerContent: string
    coachComment: string
  }
  longTermGoal?: {
    playerContent: string
    coachComment: string
  }
  otherComments?: {
    playerContent: string
    coachComment: string
  }
  playerNotedAt?: string
}

export interface ImageVideoType {
  value?: string
  position?: number
}

export interface TrophiesAndAwardsType {
  achievementType?: string
  trophyType?: string
  name?: string
  country?: CountryType
  connectedClub?: {
    connectedClubType: string
    careerId: string
    clubId: string
  }
  date?: string
  description?: string
  media?: [
    {
      type: string
      url: string
    }
  ]
}

export interface FutureCareerType {
  fromTime: string
  toTime: string
  country: CountryType
  league: {
    name: string
  }
  clubId: string
  team: {
    teamName: string
    clubId: string
  }
  role: string
  motivation: string
}

export interface HistoricCareerType {
  season: string
  fromTime: string
  toTime: string
  country: {
    name: string
    alpha2Code: string
    alpha3Code: string
    region: string
    flag: string
    phoneCode: string
  }
  league: {
    name: string
  }
  clubId: string
  team: {
    teamName: string
    clubId: string
  }
  role: string
  serieMatches: number
  cupMatches: number
  friendlyMatches: number
  wonMatches: number
  lostMatches: number
  drawMatches: number
  madeTeamGoals: number
  letInTeamGoals: number
  yourGoals: number
  yourAssists: number
  yourYellowCards: number
  yourRedCards: number
  yourEstPlayTime: number
  summary: string
  mediaLinks: [
    {
      type: string
      url: string
    }
  ]
}
