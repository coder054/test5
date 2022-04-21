import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const fetchGroup = async ({
  groupId,
}: {
  groupId: string | string[]
}) => {
  return axios.get(`groups/${groupId}`)
}

export const fetchContacts = async ({
  limit,
  sorted,
  startAfter,
  tab,
  country,
  clubId,
  teamId,
  role,
}: {
  limit: number
  sorted: 'asc' | 'desc'
  startAfter: number
  tab: string
  country: string
  clubId: string
  teamId: string
  role: string
}) => {
  return axios.get(
    toQueryString(API_GET_LIST_CONTACT, {
      limit: limit,
      sorted: sorted,
      startAfter: startAfter,
      tab: tab,
      country: country,
      clubId: clubId,
      teamId: teamId,
      role: role,
    })
  )
}

export type NewGroupType = {
  name: string
  groupImage: string
  memberIds: string[]
  isPrivate: boolean
}

export type NewClubType = {
  clubName: string
  logoUrl: string
  nickName: string
  city: string
  country: string
  arena: string
  websiteUrl: string
}

export type NewTeamType = {
  teamName: string
  teamImage: string
  memberIds: string[]
  isPrivate: boolean
}

export const createGroup = async ({ data }: { data: NewGroupType }) => {
  return await axios.post(`groups`, data)
}

export const editGroup = async ({
  data,
  groupId,
}: {
  data: NewGroupType
  groupId: string | string[]
}) => {
  return await axios.patch(`groups/${groupId}/edit-group`, data)
}

export const editMember = async ({
  data,
  groupId,
}: {
  data: { memberIds: string[]; memberType: 'MEMBER' | 'ADMIN' | 'OWNER' }
  groupId: string | string[]
}) => {
  return await axios.patch(`groups/${groupId}/update-member`, data)
}

export const createClub = async ({ data }: { data: NewClubType }) => {
  return await axios.post(`clubs`, data)
}

export const createTeam = async ({
  data,
  clubId,
}: {
  data: NewTeamType
  clubId: string
}) => {
  return await axios.post(`teams/${clubId}/create-new-team`, data)
}

export const deleteGroup = async ({
  groupId,
}: {
  groupId: string | string[]
}) => {
  return await axios.delete(`groups/${groupId}/delete-group`)
}

export const leaveGroup = async ({
  groupId,
}: {
  groupId: string | string[]
}) => {
  return await axios.delete(`groups/${groupId}/leave-group`)
}

export const requestToJoinGroup = async (groupId: string | string[]) => {
  return await axios.post(`groups/${groupId}/send-request-join-group`)
}

export const cancelRequestJoinGroup = async (groupId: string | string[]) => {
  return await axios.delete(`groups/${groupId}/cancel-request-join-group`)
}

export const deleteGroupMember = async ({
  groupId,
  memberId,
}: {
  groupId: string | string[]
  memberId: string
}) => {
  return await axios.delete(`groups/${groupId}/${memberId}/delete-member`)
}

export const blockGroupMember = async ({
  data,
}: {
  data: { groupId: string | string[]; memberId: string }
}) => {
  return await axios.post(`groups/block-member`, data)
}

export const unblockGroupMember = async ({
  data,
}: {
  data: { groupId: string | string[]; memberIds: string[] }
}) => {
  return await axios.post(`groups/unblock-member`, data)
}

export const fetchGroupMember = async ({
  groupId,
  limit,
  sort,
  startAfter,
  tab,
}: {
  groupId: string | string[]
  limit: number
  sort: string
  startAfter: string
  tab: string
}) => {
  return axios.get(
    toQueryString(`groups/${groupId}/get-members`, {
      limit: limit,
      sort: sort,
      startAfter: startAfter,
      tab: tab,
    })
  )
}
