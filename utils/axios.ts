import axiosLib from 'axios'
import { auth } from 'config'
import { signOut } from 'firebase/auth'
import querystring from 'query-string'
import { get } from 'lodash'
import { LOCAL_STORAGE_KEY } from 'constants/constants'
import { Cookies } from 'react-cookie'

/**
 * Axios instance for browser,
 * with `access-token` header injected
 */

export const axios = axiosLib.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-type': 'application/json',
    'XSRF-TOKEN': 'csrfToken',
  },
  paramsSerializer: (param) => querystring.stringify(param),
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // const cookies = new Cookies()
    if (get(error, 'response.status') === 401) {
      // cookies.remove('token')
      signOut(auth)
      setTimeout(() => {
        window.location.href = '/signin'
      }, 200)
    }
    return Promise.reject(error)
  }
)

axios.interceptors.request.use((config) => {
  // First make the config.url URI code, and then replace the special characters in the overall situation, then decode the URI decoding
  config.url = decodeURI(encodeURI(config.url || '').replace(/%E2%80%8B/g, ''))
  return config
})

if (
  typeof window !== 'undefined' &&
  window.localStorage.getItem(LOCAL_STORAGE_KEY.currentRoleId)
) {
  //@ts-ignore: Unreachable code error
  axios.defaults.headers.roleId = window.localStorage.getItem(
    LOCAL_STORAGE_KEY.currentRoleId
  )
}

const cookies = new Cookies()
const token = cookies.get(LOCAL_STORAGE_KEY.token)

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
