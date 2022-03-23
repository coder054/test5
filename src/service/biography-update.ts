import {
  API_ACHIEVEMENTS_TROPHY,
  API_COACH_PROFILE,
  API_CREATE_CAREERS_FUTURE,
  API_CREATE_CAREERs_HISTORIC,
  API_GET_LIST_DEVELOPMENT_NOTES,
  API_PLAYER_CREATE_DEVELOPMENT_NOTE,
  API_PLAYER_PROFILE,
  API_PLAYER_UPDATE_DEVELOPMENT_NOTE,
} from 'src/constants/api.constants'
import {
  FutureCareerType,
  HistoricCareerType,
  TrophiesAndAwardsType,
  UpdateSkills,
} from 'src/constants/types'
import { axios } from 'src/utils/axios'

export const getPlayerRadar = async (currentRoleId: string) => {
  const response = await axios.get(
    `/biographies/player?userIdQuery=${currentRoleId}`
  )

  return response
}

export const coachUpdatePlayerSkills = async (
  playerId: string,
  updateSkills: UpdateSkills,
  roleId: string
) => {
  const response = await axios.patch(
    `/users/${playerId}/coach-update-player-skills`,
    updateSkills,
    {
      headers: {
        roleId: roleId,
      },
    }
  )

  return response
}

export const getListDevelopmentNotes = async () => {
  const response = await axios.get(
    `${API_GET_LIST_DEVELOPMENT_NOTES}?limit=10&sorted=asc`
  )

  return response
}

export const playerCreateDevelopmentNote = async (body: any) => {
  const response = await axios.post(API_PLAYER_CREATE_DEVELOPMENT_NOTE, body)

  return response
}

export const playerUpdateDevelopmentNote = async (
  body: any,
  devTalkId: string
) => {
  const response = await axios.patch(
    `${API_PLAYER_UPDATE_DEVELOPMENT_NOTE}/${devTalkId}`,
    body
  )

  return response
}

export const getProfileCoach = async () => {
  const response = await axios.get(API_COACH_PROFILE)

  return response
}

export const getProfilePlayer = async () => {
  const response = await axios.get(API_PLAYER_PROFILE)

  return response
}

export const createTrophies = async (body: TrophiesAndAwardsType) => {
  const response = await axios.post(API_ACHIEVEMENTS_TROPHY, body)

  return response
}

export const createFutureCareer = async (body: FutureCareerType) => {
  const response = await axios.post(API_CREATE_CAREERS_FUTURE, body)

  return response
}

export const createCareerHistoric = async (body: HistoricCareerType) => {
  const response = await axios.post(API_CREATE_CAREERs_HISTORIC, body)

  return response
}
