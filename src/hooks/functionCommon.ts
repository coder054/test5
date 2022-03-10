import { Rule } from 'antd/lib/form'

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
