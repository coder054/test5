import axiosLib from 'axios'
import { signOut } from 'firebase/auth'
import { get } from 'lodash'
import querystring from 'query-string'
import { auth } from 'src/config/firebase-client'
import { COOKIE_KEY } from 'src/constants/constants'
import { parseCookies } from './utils'

/**
 * Axios instance for browser,
 * with `access-token` header injected
 */

let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
if (typeof window !== 'undefined') {
  baseURL = localStorage.getItem('baseurl') || baseURL
}

export const axios = axiosLib.create({
  baseURL: baseURL,
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
        window.location.href = '/sign-in'
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

if (typeof window !== 'undefined' && parseCookies(null)[COOKIE_KEY.roleid]) {
  //@ts-ignore: Unreachable code error
  axios.defaults.headers.roleId = parseCookies(null)[COOKIE_KEY.roleid]
}

const token = parseCookies(null)[COOKIE_KEY.token]

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
