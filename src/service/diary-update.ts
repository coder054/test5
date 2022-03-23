import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { API_DIARY, API_GET_DIARY } from 'src/constants/api.constants'
import { getStartOfDate } from 'src/hooks/functionCommon'
import toast from 'react-hot-toast'

export const fetchDiary = async (date?: string | Date, roleName?: string) => {
  return axios
    .get(
      toQueryString(`${API_DIARY}/${roleName.toLowerCase()}/${API_GET_DIARY}`, {
        createdAt: getStartOfDate(date),
      })
    )
    .then((res) => {
      return res.data
    })
    .catch(() => {
      toast.error('An error has occurred')
    })
}

export const fetchMember = async (teamId: string) => {
  return axios
    .get(`teams/${teamId}/get-members-in-team`)
    .then((res) => {
      return res.data
    })
    .catch(() => {
      toast.error('An error has occurred')
    })
}
