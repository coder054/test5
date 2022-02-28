import cookies from 'js-cookie'

export const getTokenCookie = () => cookies.get('token')

export const setTokenCookie = (token: string) => {
  // cookies.set('token', token, {
  //   // expires: 1 / 24, // 1 hour
  //   expires: 1,
  // })

  fetch('/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
}

// export const removeTokenCookie = () => cookies.remove('token')

export const removeTokenCookie = () => {
  fetch('/api/logout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
}
