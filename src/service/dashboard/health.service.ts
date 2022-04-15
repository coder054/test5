import {
  API_GET_HEALTH_CHARTS,
  API_POST_HEALTH,
} from 'src/constants/api.constants'
import { DashboardHealthUpdateType } from 'src/constants/types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const getHealthChart = async (
  lastMonthRange: string,
  healthChartType: string
) => {
  return axios
    .get(
      toQueryString(API_GET_HEALTH_CHARTS, {
        healthChartType: healthChartType,
        lastMonthRange: lastMonthRange,
      })
    )
    .then((res) => {
      return res.data
    })
}

export const postHealth = async ({
  docId,
  body,
}: {
  docId: string
  body: any
}) => {
  return axios.patch(`${API_POST_HEALTH}/${docId}`, { ...body })
}

export const removeHealth = async (id: string) => {
  return axios.delete(`${API_POST_HEALTH}/${id}`)
}
