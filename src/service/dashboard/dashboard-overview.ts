import toast from 'react-hot-toast'
import {
  API_GET_DASBOARD_DIARIES_STATISTIC,
  API_GET_DASHBOARD_FANS_STATS,
  API_GET_DASHBOARD_FRIENDS_STATS,
  API_GET_DASHBOARD_PAIN,
  API_GET_DASHBOARD_VISITOR_STATS,
  API_GET_DASHBOARD_VISIT_STATS,
  API_GET_DASHBOARD_WELLNESS,
  API_GET_LIST_DIARIES_REPORT,
  API_GET_LIST_LEADER_BOARD,
} from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const GetListLeaderBoard = async (
  limit: number,
  startAfter: number,
  sorted: string,
  category: string,
  lastDateRange: string
) => {
  return axios
    .get(
      `${API_GET_LIST_LEADER_BOARD}?limit=${limit}&startAfter=${startAfter}&sorted=${sorted}&category=${category}&lastDateRange=${lastDateRange}`
    )
    .then((res) => {
      return res.data
    })
    .catch(() => {
      toast.error('Something went wrong')
    })
}

export const GetListDiariesReport = async (
  limit: number,
  sorted: string,
  dashboardTab: string
) => {
  return axios.get(
    toQueryString(API_GET_LIST_DIARIES_REPORT, {
      limit: limit,
      sorted: sorted,
      dashboardTab: dashboardTab,
    })
  )
}

export const getDiariesStatistic = async (
  lastDateRange: string,
  dashboardTab: string
) => {
  return axios
    .get(
      toQueryString(API_GET_DASBOARD_DIARIES_STATISTIC, {
        lastDateRange: lastDateRange,
        dashboardTab: dashboardTab,
      })
    )
    .then((res) => {
      return res.data
    })
}

export const getDashboardVisitStat = async (lastDateRange: string) => {
  return axios
    .get(
      toQueryString(API_GET_DASHBOARD_VISIT_STATS, {
        lastDateRange: lastDateRange,
      })
    )
    .then((res) => {
      return res.data
    })
}

export const getDashboardVisitorStat = async (lastDateRange: string) => {
  return axios
    .get(
      toQueryString(API_GET_DASHBOARD_VISITOR_STATS, {
        lastDateRange: lastDateRange,
      })
    )
    .then((res) => {
      return res.data
    })
}

export const getDashboardFansStat = async (lastDateRange: string) => {
  return axios
    .get(
      toQueryString(API_GET_DASHBOARD_FANS_STATS, {
        lastDateRange: lastDateRange,
      })
    )
    .then((res) => {
      return res.data
    })
}

export const getDashboardFriendStat = async (lastDateRange: string) => {
  return axios
    .get(
      toQueryString(API_GET_DASHBOARD_FRIENDS_STATS, {
        lastDateRange: lastDateRange,
      })
    )
    .then((res) => {
      return res.data
    })
}

export const getDashboardWellness = async (
  lastDateRange: string,
  diaryRoutine: string
) => {
  return axios
    .get(
      toQueryString(API_GET_DASHBOARD_WELLNESS, {
        lastDateRange: lastDateRange,
        diaryRoutine: diaryRoutine,
      })
    )
    .then((res) => {
      return res.data
    })
}

export const getDashboardPain = async (lastDateRange: string) => {
  return axios
    .get(
      toQueryString(API_GET_DASHBOARD_PAIN, { lastDateRange: lastDateRange })
    )
    .then((res) => {
      return res.data
    })
}
