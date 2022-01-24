import axiosLib from 'axios'
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
})

const cookies = new Cookies()
const token = cookies.get('token')

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

axios.interceptors.request.use((config) => {
  // First make the config.url URI code, and then replace the special characters in the overall situation, then decode the URI decoding
  config.url = decodeURI(encodeURI(config.url || '').replace(/%E2%80%8B/g, ''))
  return config
})
