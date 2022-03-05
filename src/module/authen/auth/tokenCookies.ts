import cookies from 'js-cookie'

export const getTokenCookie = () => cookies.get('token')

export const setTokenCookieHttp = (token: string) => {
  fetch('/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
}

export const removeTokenCookieHttp = () => {
  fetch('/api/logout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
}
