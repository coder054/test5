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

type NewGroupType = {
  name: string
  groupImage: string
  memberIds: string[]
  isPrivate: boolean
}

export const createGroup = async ({ data }: { data: NewGroupType }) => {
  return await axios.post(`groups`, data)
}
