import {
  API_CREATE_PLAIN_POST,
  API_GET_LIST_NEWS_POST,
  API_GET_LIST_NEWS_POST_OF_PROVIDER,
  API_GET_LIST_NEWS_PROVIDERS,
  API_LIKE_POST,
} from 'src/constants/api.constants'
import { PostFeed } from 'src/modules/feed/component/modal/types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const getListNewProvider = async () => {
  return axios.get(API_GET_LIST_NEWS_PROVIDERS)
}

export const getListNewPost = async ({
  limit,
  sorted,
  startAfter,
}: {
  limit: number
  sorted: string
  startAfter: number
}) => {
  return axios.get(
    toQueryString(API_GET_LIST_NEWS_POST, {
      limit: limit,
      sorted: sorted,
      startAfter: startAfter,
    })
  )
}

export const getListNewPostOfProvider = async ({
  limit,
  sorted,
  startAfter,
  providerId,
  typeOfProvider,
}: {
  limit: number
  sorted: string
  startAfter: number
  providerId: string
  typeOfProvider: string
}) => {
  const res = await axios.get(
    toQueryString(API_GET_LIST_NEWS_POST_OF_PROVIDER, {
      limit: limit,
      sorted: sorted,
      startAfter: startAfter,
      providerId: providerId,
      typeOfProvider: typeOfProvider,
    })
  )

  return res.data
}

export const createPlainPost = async (body: PostFeed) => {
  return axios.post(API_CREATE_PLAIN_POST, body)
}

export const subscribeProvider = async (providerId: string) => {
  return axios.post(
    toQueryString(`feed/${providerId}/subscribe-provider`, {
      providerId: providerId,
    })
  )
}

export const likePost = async ({
  postId,
  typeOfPost,
  query,
}: {
  postId: string
  typeOfPost: string
  query: string
}) => {
  return axios.post(
    toQueryString(API_LIKE_POST, {
      postId: postId,
      typeOfPost: typeOfPost,
      query: query,
    })
  )
}
