import {
  DashboardTabType,
  LastRangeDateType,
} from 'src/constants/types/dashboard/training.types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const fetchTraining = async ({
  range,
  tab,
}: {
  range: LastRangeDateType
  tab: DashboardTabType
}) => {
  return axios.get(
    toQueryString('dashboard/get-diaries-statistic', {
      lastDateRange: range,
      dashboardTab: tab,
    })
  )
}

export const fetchUpdates = async ({
  range,
  tab,
  limit,
  sorted,
  startAfter,
}: {
  startAfter: number
  range: LastRangeDateType
  tab: DashboardTabType
  limit: number
  sorted: 'asc' | 'desc'
}) => {
  return axios.get(
    toQueryString('dashboard/get-list-diaries-report', {
      lastDateRange: range,
      dashboardTab: tab,
      startAfter,
      sorted,
      limit,
    })
  )
}
