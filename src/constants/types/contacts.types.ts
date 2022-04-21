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

export type GroupType = Partial<{
  userImages: string[]
  createdBy: string
  updatedAt: number
  createdAt: number
  groupNameAsArray: string[]
  groupImage: string
  name: string
  isPrivate: boolean
  groupId: string
  usernames: string[]
  userIds: string[]
  memberType: string
}>

export type ContactsTabType =
  | 'ALL'
  | 'GROUPS'
  | 'FANS'
  | 'TEAM'
  | 'FOLLOWERS'
  | 'FRIENDS'
  | 'BLOCKED'
  | 'TEAMMATES'
  | 'FAMILY'

export type GroupTabType = 'MEMBER' | 'REQUEST' | 'ADMIN' | 'OWNER' | 'BLOCK'

export type QueriesContactsType = Partial<{
  limit: number
  sorted: 'asc' | 'desc'
  startAfter: number | string
  tab: ContactsTabType
  country?: string
  clubId: string
  teamId: string
  role: string
  search: string
}>

export type QueriesContactMemberType = Partial<{
  groupId: string
  limit: number
  name: string
  startAfter: number
  sorted: 'asc' | 'desc'
  userIdQuery: string
  tab: GroupTabType
  memberType: GroupTabType
}>

export type InfiniteInitialType = {
  count: number
  isLoading: boolean
  isSearching: boolean
  hasMore: boolean
}
