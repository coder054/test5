import {
  API_BLOCK_COMMENT,
  API_CREATE_COMMENT,
  API_DELETE_COMMENT,
  API_GET_MY_TEAM,
  API_LIKE_COMMENT,
} from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const createCommentService = async ({
  postId,
  typeOfPost,
  body,
}: {
  postId: string
  typeOfPost: string
  body: any
}) => {
  return axios.post(
    toQueryString(API_CREATE_COMMENT, {
      postId: postId,
      typeOfPost: typeOfPost,
    }),
    { ...body }
  )
}

export const likeCommentService = async ({
  postId,
  typeOfPost,
  query,
  commentId,
}: {
  postId: string
  typeOfPost: string
  query: string
  commentId: string
}) => {
  return axios.post(
    toQueryString(API_LIKE_COMMENT, {
      postId: postId,
      typeOfPost: typeOfPost,
      query: query,
      commentId: commentId,
    })
  )
}

export const blockCommentService = async ({
  postId,
  typeOfPost,
  commentId,
}: {
  postId: string
  typeOfPost: string
  commentId: string
}) => {
  return axios.post(
    toQueryString(`${API_BLOCK_COMMENT}/${commentId}`, {
      postId: postId,
      typeOfPost: typeOfPost,
      // commentId: commentId,
    })
  )
}

export const deleteCommentService = async ({
  postId,
  typeOfPost,
  commentId,
}: {
  postId: string
  typeOfPost: string
  commentId: string
}) => {
  return axios.delete(
    toQueryString(`${API_DELETE_COMMENT}/${commentId}`, {
      postId: postId,
      typeOfPost: typeOfPost,
      commentId: commentId,
    })
  )
}

export const getYourTeamService = async (userIdQuery: string) => {
  return axios.get(toQueryString(`${API_GET_MY_TEAM}/${userIdQuery}`))
}
