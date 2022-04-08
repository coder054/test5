import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

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
