export interface Notification {
  id: string
  author?: string
  avatar?: string
  company?: string
  createdAt: number
  description?: string
  job?: string
  title?: string
  read?: boolean
  type: string
}

export interface INoti {
  senderId: string
  notificationStatus: boolean
  createdAt: number
  receiverId: string
  body: Body
  title: Title
  username: Username
  userType: UserType
  updatedAt: number
  notificationType: NotificationType
  largeIcon: string
  notificationId: string
  teamId?: string
  groupId?: string
  playerDiaryData?: any
  coachDiaryData?: any
  playerNotedAt?: any
  postId?: string
  typeOfPost?: string
  diaryId?: string
  developmentNoteData?: DevelopmentNoteData
}

export enum Body {
  Aaabbb911110ASentYouAFriendRequest = '#aaabbb911110A sent you a friend request',
  The3DSinceYouUpdatedYourDiaryNow = '3d since you updated your diary now!',
}

export enum NotificationType {
  FriendRequest = 'FRIEND_REQUEST',
  RemindOnDiaryUpdate = 'REMIND_ON_DIARY_UPDATE',
  ASK_JOIN_TEAM = 'ASK_JOIN_TEAM',
}

export enum Title {
  Zporter = 'Zporter',
  ZporterDiary = 'Zporter Diary',
}

export enum UserType {
  Player = 'PLAYER',
  SysAdmin = 'SYS_ADMIN',
}

export enum Username {
  Aaabbb911110A = 'aaabbb911110A',
  Zporter = 'Zporter',
}

export interface DevelopmentNoteData {
  strength: BestDevelopSkills
  weaknesses: BestDevelopSkills
  coachNotedAt?: number
  coachId?: string
  shortTermGoal: BestDevelopSkills
  devTalkId: string
  longTermGoal: BestDevelopSkills
  playerId: string
  bestWayToDevelop: BestDevelopSkills
  skillsNeededToDevelop: BestDevelopSkills
  bestDevelopSkills: BestDevelopSkills
  otherComments: BestDevelopSkills
  coachDevelopmentProgress?: string
  playerNotedAt: number | string | Date
  updatedAt: number
  createdAt: number
  playerDevelopmentProgress: string
}

export interface BestDevelopSkills {
  playerContent: string
  coachComment: string
}
