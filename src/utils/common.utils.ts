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

export const handleStringFirstUppperCase = (value: string): string => {
  let result = ''
  if (!value) return ''
  value = value?.toLocaleLowerCase()
  result += value?.charAt(0).toUpperCase()
  for (let i = 1; i < value?.length; i++) {
    if (value?.charAt(i) !== '_' && value?.charAt(i - 1) !== '_') {
      result += value?.charAt(i)
    } else if (value?.charAt(i) !== '_' && value?.charAt(i - 1) === '_') {
      result += value?.charAt(i).toUpperCase()
    } else if (value?.charAt(i) === '_' && value?.charAt(i - 1) !== '_') {
      result += ' '
    }
  }

  return result
}
