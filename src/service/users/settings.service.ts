import { AccountSettingsType } from 'src/constants/types/settingsType.type'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const fetchSettings = async ({ roleName }: { roleName: string }) => {
  return axios.get(`users/${roleName.toLocaleLowerCase()}-profile`)
}

export const fetchClubs = async ({
  limit,
  startAfter,
  clubName,
}: {
  limit: number
  startAfter: number
  clubName: string
}) => {
  return axios.get('clubs', {
    params: {
      limit,
      startAfter,
      clubName,
    },
  })
}

export const updateSettings = async ({
  data,
  currentRoleName,
}: {
  data: AccountSettingsType
  currentRoleName: string
}) => {
  return axios.patch(`users/${currentRoleName.toLowerCase()}/settings`, data)
}
