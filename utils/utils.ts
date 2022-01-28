import { get, truncate } from 'lodash'
import cookie from 'cookie'
import { notification } from 'antd'

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
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
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
