export const getCookieFromReq = (cookieString: string, cookieKey: string) => {
  const cookie = cookieString
    .split(';')
    .find((c) => c.trim().startsWith(`${cookieKey}=`))
  if (!cookie) {
  }
  if (!cookie) return undefined
  return cookie.split('=')[1]
}
