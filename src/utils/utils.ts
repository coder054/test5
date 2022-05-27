import { notification } from 'antd'
import cookie from 'cookie'
import dayjs from 'dayjs'
import cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { chain, get, isEqual, isNaN, truncate } from 'lodash'
import Resizer from 'react-image-file-resizer'
import { AVATAR_DEFAULT } from 'src/constants/constants'
import { IDevelopmentFormValues } from 'src/modules/dashboard/development-dashboard/component/modal/note-modal'
import { DevelopmentNoteData } from 'src/types/notification'
import { axios } from './axios'

export interface ITokenData {
  iss: string
  aud: string
  auth_time: number
  user_id: string
  sub: string
  iat: number
  exp: number
  email: string
  email_verified: boolean
  phone_number: string
  firebase: Firebase
}

export interface Firebase {
  identities: Identities
  sign_in_provider: string
}

export interface Identities {
  phone: string[]
  email: string[]
}

export const truncateStr = (str: string, max: number) => {
  if (!str) {
    return ''
  }
  return truncate(str, {
    length: max,
    separator: /,? +/,
  })
}

export const getStr = (
  obj: any,
  path: string,
  defaultValue = '',
  maxlength = 10000000000
): any => {
  if (get(obj, path) === 0) {
    return 0
  }
  if (get(obj, path) === null) {
    return defaultValue || ''
  }
  if (typeof get(obj, path) === 'object') {
    return ''
  }

  return truncateStr(get(obj, path) || defaultValue || '', maxlength)
}

export const checkNumber = (number: any) => {
  return !isNaN(Number(String(number)))
}

export const equalStr = (str1: string, str2: string) => {
  return str1.trim().toLowerCase() === str2.trim().toLowerCase()
}

export function parseCookies(req) {
  return cookie.parse(
    req
      ? req.headers.cookie || ''
      : typeof window !== 'undefined'
      ? window.document.cookie
      : ''
  )
}

export function notify(
  type: 'error' | 'success',
  message: string,
  description: string
) {
  notification[type]({
    message,
    description,
  })
}

export const fetcher = async (url) => {
  if (url === null) return
  const data = await axios.get(url)
  if (data.status === 200) {
    return data.data
  }
  return { error: true }
}

export const dataFromToken = (token: string) => {
  if (typeof window !== undefined && token) {
    // Generated by https://quicktype.io

    try {
    } catch (_error) {
      return
    }

    const tokenData: ITokenData = jwtDecode(token)
    return tokenData
  }
  return {}
}

export const detectURLName = (host?: string) => {
  const url = new URL(host ? host : '')
  return url.host.split('.')[url.host.split('.').length - 2].toUpperCase()
}

export const detectValidURL = (url?: string) => {
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  const regex = new RegExp(expression)
  return url?.match(regex)
}

export const getYoutubeThumbnail = (
  url?: string,
  quality?: 'low' | 'medium' | 'high' | 'max'
) => {
  if (url) {
    let video_id, thumbnail, result
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      video_id = result.pop()
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      video_id = result.pop()
    }
    if (video_id) {
      if (typeof quality == 'undefined') {
        quality = 'high'
      }
      var quality_key = 'maxresdefault'
      if (quality == 'low') {
        quality_key = 'sddefault'
      } else if (quality == 'medium') {
        quality_key = 'mqdefault'
      } else if (quality == 'high') {
        quality_key = 'hqdefault'
      }

      thumbnail =
        'http://img.youtube.com/vi/' + video_id + '/' + quality_key + '.jpg'
      return thumbnail
    }
  }
  return ''
}

export const setCookieUtil = (key: string, value: string) => {
  cookies.set(key, value, {
    expires: 100000000,
  })
}

export const removeCookieUtil = (key: string) => {
  cookies.remove(key)
}

export const getErrorMessage = (err) => {
  return get(err, 'response.data.message', get(err, 'message')) || ''
}

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'base64'
    )
  })

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getSafeLink = (link) => link.replace('#', '%23222#')

export const safeAvatar = (str: string) => {
  if (str === 'faceImage' || str === '') {
    return AVATAR_DEFAULT
  }
  return str
}

export const safeHttpImage = (str: string) => {
  if (!str) {
    return ''
  }

  if (str.indexOf('http://') === 0) {
    return getSafeLink(`https://images.weserv.nl/?url=${str}`)
  }
  return getSafeLink(str)
}

export const toFixedIfNecessary = (value, dp = 2) => {
  if (isNaN(parseFloat(value))) {
    return value
  }
  return +parseFloat(value).toFixed(dp)
}

export const isEqualArraysNoOrder = (arr1: string[], arr2: string[]) => {
  return isEqual(
    chain(arr1).compact().uniq().sortBy().value(),
    chain(arr2).compact().uniq().sortBy().value()
  )
}

export const getBioUrl = (
  role: string,
  username: string,
  firstName: string,
  lastName: string
) => {
  const firstLastName =
    `${firstName}.${lastName}`.replace(/\s/g, '').toLowerCase() || 'zporter'

  return `/${
    equalStr(role, 'PLAYER') ? 'player' : 'coach'
  }/${username}/${firstLastName}`
}

export const getTeamUrl = (teamId: string) => {
  return `/contacts/team/${teamId}`
}

export const getGroupUrl = (groupId: string) => {
  return `/contacts/group/${groupId}`
}

export const getDevelopmentDataForForm = (data: DevelopmentNoteData) => {
  let developmentData: IDevelopmentFormValues = {
    strengthPlayer: data.strength.playerContent,
    strengthCoach: data.strength.coachComment,
    weaknessesPlayer: data.weaknesses.playerContent,
    weaknessesCoach: data.weaknesses.coachComment,
    bestDevelopSkillsPlayer: data.bestDevelopSkills.playerContent,
    bestDevelopSkillsCoach: data.bestDevelopSkills.coachComment,
    skillsNeededToDevelopPlayer: data.skillsNeededToDevelop.playerContent,
    skillsNeededToDevelopCoach: data.skillsNeededToDevelop.coachComment,
    bestWayToDevelopPlayer: data.bestWayToDevelop.playerContent,
    bestWayToDevelopCoach: data.bestWayToDevelop.coachComment,
    shortTermGoalPlayer: data.shortTermGoal.playerContent,
    shortTermGoalCoach: data.shortTermGoal.coachComment,
    longTermGoalPlayer: data.longTermGoal.playerContent,
    longTermGoalCoach: data.longTermGoal.coachComment,
    otherCommentsPlayer: data.otherComments.playerContent,
    otherCommentsCoach: data.otherComments.coachComment,
    date: dayjs(data.updatedAt).format('YYYY/MM/DD'),
    progress: data.playerDevelopmentProgress,
    contractedClub: {
      arena: '',
      city: '',
      clubId: '',
      clubName: '',
      country: '',
      logoUrl: '',
      websiteUrl: null,
    },
    currentTeams: '',
  }
  return developmentData
}
