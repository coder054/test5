import { get, truncate } from 'lodash'
import Resizer from 'react-image-file-resizer'
import cookies from 'js-cookie'
import cookie from 'cookie'
import { notification } from 'antd'
import { axios } from './axios'
import jwtDecode from 'jwt-decode'
import { AVATAR_DEFAULT } from 'src/constants/constants'

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
    } catch (error) {
      console.log(error)
      return {}
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
  return get(err, 'response.data.messages', get(err, 'message')) || ''
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

export const safeAvatar = (str: string) => {
  if (str === 'faceImage' || str === '') {
    return AVATAR_DEFAULT
  }
  return str
}
