import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { QueriesContactsType } from '../../constants/types/contacts.types'
import { NewTeamType } from './group.service'

export const fetchTeam = async ({ teamId }: { teamId: string | string[] }) => {
  return axios.get(`teams/${teamId}`)
}

export const fetchTeamMember = async ({
  teamId,
  limit,
  sort,
  startAfter,
  tab,
}: {
  teamId: string | string[]
  limit: number
  sort: string
  startAfter: string
  tab: string
}) => {
  return axios.get(
    toQueryString(`teams/${teamId}/get-members`, {
      limit: limit,
      sort: sort,
      startAfter: startAfter,
      tab: tab,
    })
  )
}

export const editTeam = async ({
  data,
  teamId,
}: {
  data: NewTeamType
  teamId: string | string[]
}) => {
  return await axios.patch(`teams/${teamId}/edit-team`, data)
}

export const leaveTeam = async ({ teamId }: { teamId: string | string[] }) => {
  return await axios.delete(`teams/${teamId}/leave-team`)
}

export const deleteTeam = async ({ teamId }: { teamId: string | string[] }) => {
  return await axios.delete(`teams/${teamId}/delete-team`)
}

export const requestToJoinTeam = async (teamId: string | string[]) => {
  return await axios.post(`teams/${teamId}/send-request-join-team`)
}

export const cancelRequestJoinTeam = async (teamId: string | string[]) => {
  return await axios.delete(`teams/${teamId}/cancel-request-join-team`)
}

export const joinTeam = async ({ teamId }: { teamId: string | string[] }) => {
  return await axios.post(`teams/${teamId}/send-request-join-team`)
}

export const deleteTeamMember = async ({
  teamId,
  memberId,
}: {
  teamId: string | string[]
  memberId: string
}) => {
  return await axios.delete(`teams/${teamId}/${memberId}/delete-member`)
}

export const blockTeamMember = async ({
  data,
}: {
  data: { teamId: string | string[]; memberId: string }
}) => {
  return await axios.post(`teams/block-member`, data)
}

export const editTeamMember = async ({
  data,
  teamId,
}: {
  data: { memberIds: string[]; memberType: 'MEMBER' | 'ADMIN' | 'OWNER' }
  teamId: string | string[]
}) => {
  return await axios.patch(`teams/${teamId}/update-member`, data)
}

export const unblockTeamMember = async ({
  data,
}: {
  data: { teamId: string | string[]; memberIds: string[] }
}) => {
  return await axios.post(`teams/unblock-member`, data)
}

export const fetchTeams = async ({
  limit,
  sorted,
  startAfter,
  tab,
  country,
  clubId,
  teamId,
  role,
  search,
}: QueriesContactsType) => {
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
      search: search,
    })
  )
}
