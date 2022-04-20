import { API_GET_GET_LIST_INJURY_REPORT } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const getListInjuryReport = async ({
  limit,
  startAfter,
  sorted,
}: {
  limit: number
  startAfter?: number
  sorted: string
}) => {
  return axios.get(
    toQueryString(API_GET_GET_LIST_INJURY_REPORT, {
      limit: limit,
      startAfter: startAfter,
      sorted: sorted,
    })
  )
}
