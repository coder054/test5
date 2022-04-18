import {
  API_GET_DEVELOPMENT_TALK_CHART,
  API_GET_PLAYER_GOAL_UPDATE,
} from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const getDevelopmentTalkChart = async (lastDateRange: string) => {
  return axios.get(
    toQueryString(API_GET_DEVELOPMENT_TALK_CHART, {
      lastDateRange: lastDateRange,
    })
  )
}

export const getGoal = async (
  limit: number,
  startAfter: number,
  sorted: string
) => {
  return axios.get(
    toQueryString(API_GET_PLAYER_GOAL_UPDATE, {
      limit: limit,
      startAfter: startAfter,
      sorted: sorted,
    })
  )
}
