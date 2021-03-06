import {
  API_CRM_CREATE_SUPPORT_TICKET,
  API_GET_LIST_COMMENTS,
  API_GET_LIST_POSTS,
} from 'src/constants/api.constants'
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

export const getBioGraphyCoach = async (username: string) => {
  return axios.get(`/biographies/coach?username=${username}`)
}

export const getDiaryById = async (diaryId: string) => {
  return axios.get(
    toQueryString(`/diaries/${diaryId}/get-diary-by-id`, { diaryId: diaryId })
  )
}

export const crmCreateSupportTicket = async (body: {
  priority: string
  subject: string
  content: string
}) => {
  return axios.post(API_CRM_CREATE_SUPPORT_TICKET, body)
}

export const getListComment = async ({
  limit,
  postId,
  typeOfPost,
  startAfter,
}: {
  limit: number
  postId: string
  typeOfPost: string
  startAfter: number
}) => {
  return axios.get(
    toQueryString(API_GET_LIST_COMMENTS, {
      limit: limit,
      postId: postId,
      typeOfPost: typeOfPost,
      startAfter: startAfter,
    })
  )
}
