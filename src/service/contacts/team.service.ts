import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { QueriesContactsType } from '../../constants/types/contacts.types'

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
