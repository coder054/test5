export type MemberType = Partial<{
  isActive: boolean
  birthCountry: BirthCountry
  clubId: string
  firstName: string
  fcmToken: string[]
  city: string
  favoriteRoles: string[]
  currentTeams: string[]
  lastName: string
  faceImage: string
  fullName: string
  username: string
  type: string
  userId: string
  isOnline: boolean
  clubName: string
  timezone: string
  lastActive: number
  birthDay: Date
  createdAt: number
  updatedAt: number
  shirtNumber: number
  gender: string
  age: number
  isPublic: boolean
  notificationOn: boolean
  notificationOptions: NotificationOptions
  isRelationship?: boolean
}>

export interface BirthCountry {
  name: string
  alpha3Code: string
  region: string
  alpha2Code: string
  phoneCode: string
  flag: string
}

export interface NotificationOptions {
  feedUpdates: boolean
  messageUpdates: boolean
  inviteUpdates: boolean
  profileAndDiaryUpdates: boolean
}
