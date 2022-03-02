import { CountryType } from './settingsType.type'

export type FriendsType = {
  birthCountry: CountryType
  firstName: string
  fcmToken: any[]
  city: string
  favoriteRoles: string[]
  currentTeams: string[]
  lastName: string
  faceImage: string
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
  isRelationship: boolean
}

export type ClubRefType = {
  _firestore: Firestore
  _path: Path
  _converter: Converter
}

export type Converter = {}

export type Firestore = {
  projectId: string
}

export type Path = {
  segments: string[]
}

export type TeamsType = {
  pendingAdmins: any[]
  admins: any[]
  clubRef: ClubRefType
  pendingOwners: any[]
  clubId: string
  owners: ClubRefType[]
  createdAt: number
  teamNameAsArray: string[]
  updatedAt: number
  pendingMembers: any[]
  teamName: string
  synced: boolean
  isPrivate: boolean
  members: any[]
  teamImage: string
  clubUrl: string
  clubName: string
  userIds: string[]
  teamId: string
  usernames: string[]
  memberType: string
}
