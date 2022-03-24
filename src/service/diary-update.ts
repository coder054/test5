import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { API_DIARY, API_GET_DIARY } from 'src/constants/api.constants'
import { getStartOfDate } from 'src/hooks/functionCommon'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

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

export const fetchSettings = async (roleName?: string) => {
  return axios
    .get(`users/${roleName.toString()}-profile`)
    .then((res) => {
      return res.data
    })
    .catch(() => {
      toast.error('An error has occurred')
    })
}

export const createDiary = async ({
  roleName,
  data,
  type,
}: {
  roleName: string
  data: any
  type: string
}) => {
  return await axios
    .post(
      `diaries/${roleName.toString().toLowerCase()}/create-diary-${type}`,
      data
    )
    .catch(() => {
      toast.error('An error has occurred')
    })
}

export const deleteDiary = async (id: string) => {
  return await axios
    .delete(`diaries/delete-diary/${id}`)
    .catch(() => toast.error('An error has occurred'))
}

export const updateDiary = async ({
  roleName,
  data,
  type,
  diaryId,
  injuryId,
}: {
  roleName: string
  data: any
  type: string
  diaryId: string
  injuryId?: string
}) => {
  return await axios
    .patch(
      toQueryString(
        `diaries/${roleName.toString().toLowerCase()}/update-diary-${type}`,
        { diaryId: diaryId }
      ),
      data
    )
    .catch(() => {
      toast.error('An error has occurred')
    })
}
