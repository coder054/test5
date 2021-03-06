import toast from 'react-hot-toast'
import { API_DIARY, API_GET_DIARY } from 'src/constants/api.constants'
import { InjuryType, TypeOfDiaries } from 'src/constants/types/diary.types'
import { AccountSettingsType } from 'src/constants/types/settingsType.type'
import { getStartOfDate } from 'src/hooks/functionCommon'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

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
      toast.error('Something went wrong')
    })
}

export const fetchParticipate = async ({
  createdAt,
  typeOfDiary,
  limit,
  startAfter,
  sorted,
}: {
  limit: number
  startAfter: number
  sorted: string
  createdAt: string | Date
  typeOfDiary: TypeOfDiaries | string
}) => {
  return axios.get('diaries/get-original-diaries', {
    params: {
      limit,
      startAfter,
      sorted,
      createdAt: getStartOfDate(createdAt),
      typeOfDiary,
    },
  })
}

export const fetchMember = async (
  teamId: string,
  userType?: 'PLAYER' | 'COACH' | ''
) => {
  return axios
    .get(`teams/${teamId}/get-members-in-team`, {
      params: {
        userType,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch(() => {
      toast.error('Something went wrong')
    })
}

export const fetchSettings = async (roleName?: string) => {
  return axios
    .get(`users/${roleName.toString()}-profile`)
    .then((res) => {
      return res.data
    })
    .catch(() => {
      toast.error('Something went wrong')
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
  return await axios.post(
    `diaries/${roleName.toString().toLowerCase()}/create-diary-${type}`,
    data
  )
}

export const deleteDiary = async (id: string) => {
  return await axios
    .delete(`diaries/delete-diary/${id}`)
    .catch(() => toast.error('Something went wrong'))
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
  return await axios.patch(
    toQueryString(
      `diaries/${roleName.toString().toLowerCase()}/update-diary-${type}`,
      { diaryId: diaryId }
    ),
    data
  )
}

export const deleteInjury = async ({
  injuryId,
  diaryId,
  roleName,
}: {
  injuryId: string
  diaryId: string
  roleName: string
}) => {
  return await axios.delete(
    toQueryString(
      `diaries/${roleName.toString().toLowerCase()}/delete-injury`,
      {
        injuryId: injuryId,
        diaryId: diaryId,
      }
    )
  )
}

export const updateInjury = async ({
  diaryId,
  injuryId,
  data,
}: {
  diaryId: string
  injuryId: string
  data: InjuryType
}) => {
  return await axios.patch(
    toQueryString(`diaries/player/update-injury`, {
      injuryId: injuryId,
      diaryId: diaryId,
    }),
    data
  )
}
