export interface UpdatePersonalGoalType {
  headline: string
  category: string
  description: string
  media: any
  deadline: string
  progress: number
  docId: string
}
export interface CreatePersonalGoalType {
  headline: string
  category: string
  description: string
  media: any
  deadline: string
}

import {
  API_GET_DEVELOPMENT_TALK_CHART,
  API_GET_LIST_DEVELOPMENT_NOTES,
  API_GET_PLAYER_GOAL_UPDATE,
  API_PATCH_DELETE_PERSONAL_GOAL,
  API_PATCH_UPDATE_PERSONAL_GOAL,
  API_PLAYER_CREATE_DEVELOPMENT_NOTE,
  API_PLAYER_REMOVE_DEVELOPMENT_NOTE,
  API_PLAYER_UPDATE_DEVELOPMENT_NOTE,
  API_POST_CREATE_PERSONAL_GOAL,
} from 'src/constants/api.constants'
import { DevelopmentNoteType } from 'src/constants/types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const getDevelopmentTalkChart = async (lastDateRange: string) => {
  return axios.get(
    toQueryString(API_GET_DEVELOPMENT_TALK_CHART, {
      lastDateRange: lastDateRange,
    })
  )
}

export const getListDevelopmentNotes = async (
  limit: number,
  startAfter: number,
  sorted: string
) => {
  return axios.get(
    toQueryString(API_GET_LIST_DEVELOPMENT_NOTES, {
      limit: limit,
      startAfter: startAfter,
      sorted: sorted,
    })
  )
}

export const createDevelopmentNote = async ({
  body,
}: {
  body: DevelopmentNoteType
}) => {
  return axios.post(API_PLAYER_CREATE_DEVELOPMENT_NOTE, { ...body })
}

export const updateDevelopmentNote = async ({
  body,
  devTalkId,
}: {
  body: DevelopmentNoteType
  devTalkId: string
}) => {
  return axios.patch(`${API_PLAYER_UPDATE_DEVELOPMENT_NOTE}/${devTalkId}`, {
    ...body,
  })
}

export const removeDevelopmentNote = async (devTalkId: string) => {
  return axios.delete(`${API_PLAYER_REMOVE_DEVELOPMENT_NOTE}/${devTalkId}`)
}

//Goal
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

export const updatePersonalGoal = async ({
  body,
}: {
  body: UpdatePersonalGoalType
}) => {
  return axios.patch(API_PATCH_UPDATE_PERSONAL_GOAL, { ...body })
}

export const createPersonalGoal = async ({
  body,
}: {
  body: CreatePersonalGoalType
}) => {
  return axios.post(API_POST_CREATE_PERSONAL_GOAL, { ...body })
}

export const removePersonalGoal = async (docId: string) => {
  return axios.delete(`${API_PATCH_DELETE_PERSONAL_GOAL}/${docId}`)
}
