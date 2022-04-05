import toast from 'react-hot-toast'
import { API_GET_LIST_LEADER_BOARD } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'

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
      toast.error('An error has occurred')
    })
}
