import { API_GET_LIST_POSTS } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const getListPosts = async ({
  limit,
  startAfter,
  sorted,
  feedTab,
}: {
  limit: number
  startAfter: number
  sorted: string
  feedTab: string
}) => {
  return axios.get(
    toQueryString(API_GET_LIST_POSTS, {
      limit: limit,
      startAfter: startAfter,
      sorted: sorted,
      feedTab: feedTab,
    })
  )
}

export const getBioGraphyPlayer = async (username: string) => {
  return axios.get(`/biographies/player?username=${username}`)
}

export const getDiaryById = async (diaryId: string) => {
  return axios.get(
    toQueryString(`/diaries/${diaryId}/get-diary-by-id`, { diaryId: diaryId })
  )
}
