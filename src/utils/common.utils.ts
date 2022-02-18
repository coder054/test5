import { identity, pickBy } from 'lodash'
import querystring, { StringifyOptions } from 'query-string'

export function toQueryString(
  url: string,
  params?: object,
  option?: StringifyOptions
) {
  const trulyParams = pickBy(params, identity)
  return `${url}?${querystring.stringify(
    trulyParams || {},
    option || { arrayFormat: 'bracket' }
  )}`
}
