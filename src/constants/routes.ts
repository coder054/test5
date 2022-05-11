import { UrlObject } from 'url'
import { ParsedUrlQueryInput } from 'querystring'

export const routeHomebase = '/'
export const routeHomeUrl = makeUrlObjectFromRouteBase(routeHomebase)

export const routeLandingBase = '/landing'
export const routeLandingUrl = makeUrlObjectFromRouteBase(routeLandingBase)

export const routeSigninBase = '/sign-in'
export const routeSigninUrl = makeUrlObjectFromRouteBase(routeSigninBase)

export const routeSignupBase = '/signup'
export const routeSignupUrl = makeUrlObjectFromRouteBase(routeSignupBase)

export function makeUrlObjectFromRouteBase(
  routeBase: string,
  query: ParsedUrlQueryInput = {}
) {
  const url: UrlObject = {
    pathname: routeBase,
    query,
  }
  return url
}
