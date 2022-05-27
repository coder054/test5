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

export type CountryType = Partial<{
  alpha2Code: string
  alpha3Code: string
  flag: string
  name: string
  phoneCode: string
  region: string
}>

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
  playerNotedAt?: number | string | Date
  coachNotedAt?: number | string | Date
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

export interface DataAnalytic {
  title?: string
  total?: number
  percent?: number
  icon?: any
  data?: number[]
  color?: string
}

export interface UserInforType {
  email?: string
  isActive?: boolean
  birthCountry?: {
    name: string
    phoneCode: string
    region: string
    flag: string
    alpha3Code: string
    alpha2Code: string
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
  isPublic?: boolean
  notificationOn?: boolean
  notificationOptions?: {
    inviteUpdates: boolean
    feedUpdates: boolean
    profileAndDiaryUpdates: boolean
    messageUpdates: boolean
  }
}

export interface LeaderBoardType {
  userId?: string
  value?: number
  userInfo?: UserInforType
}

export interface AnalyticsType {
  count: number
  chart: AnalyticType[]
  percentChanged: number
}

export interface AnalyticType {
  index: number
  value: number
  day: string
}

export interface ItemChartType {
  index: number
  value: number
  day: string
}

export interface WellnessType {
  personalDiaryRoutineChart: ItemChartType[]
  averageDiaryRoutineChart: ItemChartType[]
  personalDiaryRoutinePieChart: {
    veryBad: number
    bad: number
    normal: number
    good: number
    veryGood: number
  }
  averageDiaryRoutinePieChart: {
    veryBad: number
    bad: number
    normal: number
    good: number
    veryGood: number
  }
}

export interface ItemPainType {
  injuryArea: string
  value: number
  isFront: boolean
  total: number
}
export interface DashboardPainType {
  bodyChart: ItemPainType[]
  columnChart: {
    injuryAreaF: number[]
    injuryAreaB: number[]
  }
}

export interface DashboardHealthUpdateType {
  healthId: string
  userId: string
  weight: number
  waistSkinsThickness: number
  height: number
  updatedAt: number
  systolicBloodPressure: number
  diastolicBloodPressure: number
  date: string | number | Date
  breastSkinThickness: number
  media: string[]
  thighSkinThickness: number
  otherDescription: string
  restingPulse: number
  createdAt: number
  maxPulse: number
  bmi: number
  fat: number
}

export interface DashboardGoalUpdateType {
  typeOfPost: string
  userType: string
  updatedAt: number
  description: string
  createdAt: number | string | Date
  headline: string
  deadline: string
  mediaLinks: any
  category: string
  userId: string
  personalGoalId: string
  deadlineUnix: number
  progress: number
}

export interface NewProviderType {
  providerId: string
  name: string
  logo: string
  region: string
  typeOfProvider: string
  isFollowed: boolean
}

export const NotificationType = {
  REMIND_DIARY_UPDATE_LOCAL: 'REMIND_DIARY_UPDATE_LOCAL',

  // Settings
  REMIND_ON_PROFILE: 'REMIND_ON_PROFILE',
  REMIND_ON_DIARY_UPDATE: 'REMIND_ON_DIARY_UPDATE',
  INVITE_UPDATE: 'INVITE_UPDATE',
  FEED_UPDATE: 'FEED_UPDATE',
  TEAM_TRAINING: 'TEAM_TRAINING',
  MESSAGE_UPDATE: 'MESSAGE_UPDATE',
  MATCH: 'MATCH',
  COACH_CREATE_DIARY_MATCH: 'COACH_CREATE_DIARY_MATCH',
  COACH_CREATE_DIARY_TRAINING: 'COACH_CREATE_DIARY_TRAINING',

  // Relationship
  FOLLOW: 'FOLLOW',
  FRIEND_REQUEST: 'FRIEND_REQUEST',
  FOLLOW_REQUEST: 'FOLLOW_REQUEST',
  ACCEPTED_FRIEND_REQUEST: 'ACCEPTED_FRIEND_REQUEST',
  ACCEPTED_FOLLOW_REQUEST: 'ACCEPTED_FOLLOW_REQUEST',
  REJECT_FRIEND_REQUEST: 'REJECT_FRIEND_REQUEST',
  REJECT_FOLLOW_REQUEST: 'REJECT_FOLLOW_REQUEST',

  // POST ACTIONS
  LIKE_POST: 'LIKE_POST',
  COMMENT_POST: 'COMMENT_POST',

  // TEAM
  ASK_JOIN_TEAM: 'ASK_JOIN_TEAM',
  INVITE_MEMBER_TEAM: 'INVITE_MEMBER_TEAM',
  ACCEPT_JOIN_TEAM: 'ACCEPT_JOIN_TEAM',
  REJECT_JOIN_TEAM: 'REJECT_JOIN_TEAM',
  LEAVE_TEAM: 'LEAVE_TEAM',
  DELETE_MEMBER_TEAM: 'DELETE_MEMBER_TEAM',
  BLOCK_MEMBER_TEAM: 'BLOCK_MEMBER_TEAM',
  MEMBER_CONFIRM_DELETE_MEMBER_TEAM: 'MEMBER_CONFIRM_DELETE_MEMBER_TEAM',
  MEMBER_CONFIRM_BLOCK_MEMBER_TEAM: 'MEMBER_CONFIRM_BLOCK_MEMBER_TEAM',
  ADMIN_CONFIRM_DELETE_MEMBER_TEAM: 'ADMIN_CONFIRM_DELETE_MEMBER_TEAM',
  ADMIN_CONFIRM_BLOCK_MEMBER_TEAM: 'ADMIN_CONFIRM_BLOCK_MEMBER_TEAM',
  UPGRADE_TEAM_MEMBER_TYPE: 'UPGRADE_TEAM_MEMBER_TYPE',
  DOWNGRADE_TEAM_MEMBER_TYPE: 'DOWNGRADE_TEAM_MEMBER_TYPE',
  REJECT_CREATE_TEAM: 'REJECT_CREATE_TEAM',
  ACCEPT_CREATE_TEAM: 'ACCEPT_CREATE_TEAM',

  // GROUP
  INVITE_MEMBER_GROUP: 'INVITE_MEMBER_GROUP',
  ASK_JOIN_GROUP: 'ASK_JOIN_GROUP',
  UPGRADE_GROUP_MEMBER_TYPE: 'UPGRADE_GROUP_MEMBER_TYPE',
  DOWNGRADE_GROUP_MEMBER_TYPE: 'DOWNGRADE_GROUP_MEMBER_TYPE',
  ACCEPT_JOIN_GROUP: 'ACCEPT_JOIN_GROUP',

  // MESSAGE
  SEND_MESSAGE: 'SEND_MESSAGE',

  // CLUB
  REJECT_CREATE_CLUB: 'REJECT_CREATE_CLUB',
  ACCEPT_CREATE_CLUB: 'ACCEPT_CREATE_CLUB',

  // ASK FOR REVIEWS
  ASK_FOR_REVIEW_SKILL_UPDATES: 'ASK_FOR_REVIEW_SKILL_UPDATES',
  ASK_FOR_REVIEW_DEVELOPMENT_TALK: 'ASK_FOR_REVIEW_DEVELOPMENT_TALK',

  // PLAYER OF THE WEEK
  PLAYER_OF_THE_WEEK: 'PLAYER_OF_THE_WEEK',

  // COACH COMMENT DEVELOPMENT NOTE
  COACH_COMMENT_DEVELOPMENT_NOTE: 'COACH_COMMENT_DEVELOPMENT_NOTE',
}

export const NotificationTitle = {
  ZPORTER_FEED: 'Zporter Feed',
  ZPORTER_DIARY: 'Zporter Diary',
  ZPORTER_BIOGRAPHY: 'Zporter Biography',
}

// Generated by https://quicktype.io

export interface IDevelopmentNoteFilterAPI {
  skillsNeededToDevelop: BestDevelopSkills
  playerDevelopmentProgress: string
  shortTermGoal: BestDevelopSkills
  longTermGoal: BestDevelopSkills
  playerId: string
  updatedAt: number
  strength: BestDevelopSkills
  createdAt: number
  playerNotedAt: number
  bestWayToDevelop: BestDevelopSkills
  bestDevelopSkills: BestDevelopSkills
  weaknesses: BestDevelopSkills
  otherComments: BestDevelopSkills
  devTalkId: string
}

export interface BestDevelopSkills {
  playerContent: string
  coachComment: string
}
