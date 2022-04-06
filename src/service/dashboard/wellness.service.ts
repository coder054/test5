import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { DashboardWellnessType } from 'src/constants/types/dashboard/wellness.types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const fetchWellnessChart = async ({
  range,
  type,
}: {
  range: LastRangeDateType
  type: DashboardWellnessType
}) => {
  return axios.get(
    toQueryString('dashboard/get-diaries-routine-chart', {
      lastDateRange: range,
      diaryRoutine: type,
    })
  )
}

export const fetchWellnessUpdate = async ({
  limit,
  sorted,
}: {
  limit: number
  sorted: string
}) => {
  return axios.get(
    toQueryString('dashboard/get-list-diaries-routine-report', {
      limit: limit,
      sorted: sorted,
    })
  )
}
