import { Rule } from 'antd/lib/form'
import dayjs from 'dayjs'
import { DEFAULT_DATE } from 'src/constants/constants'

export const getCookieFromReq = (cookieString: string, cookieKey: string) => {
  const cookie = cookieString
    .split(';')
    .find((c) => c.trim().startsWith(`${cookieKey}=`))
  if (!cookie) {
  }
  if (!cookie) return undefined
  return cookie.split('=')[1]
}

export function getRulePassword(message?: string): Rule {
  return {
    pattern: new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
    message: message ? message : 'Min 8 signs & 1 capital letter',
  }
}

export function generateRateByNumber(num: number) {
  switch (num) {
    case 0:
      return 'VERY_BAD'
    case 25:
      return 'BAD'
    case 50:
      return 'NORMAL'
    case 75:
      return 'GOOD'
    case 100:
      return 'VERY_GOOD'
    default:
      return
  }
}

export function generateRateByString(str: string) {
  switch (str) {
    case 'VERY_BAD':
      return 0
    case 'BAD':
      return 25
    case 'NORMAL':
      return 50
    case 'GOOD':
      return 75
    case 'VERY_GOOD':
      return 100
    default:
      return
  }
}

export function formatDate(date: string | Date) {
  return dayjs(date).format(DEFAULT_DATE)
}

export function getStartOfDate(date: string | Date) {
  return dayjs(date).startOf('day').format(DEFAULT_DATE)
}

export function formatUnixDate(date: number, format: string) {
  return dayjs(date).format(format)
}

export function flexingFormatDate(date: string | Date, format: string) {
  return dayjs(date).format(format)
}

export const getToday = () => {
  if (+dayjs(new Date()).format('HH') < 12) {
    return dayjs(new Date()).add(-1, 'day').format(DEFAULT_DATE)
  } else return new Date()
}
