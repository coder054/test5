// import { auth } from 'src/config/firebase-client'
import { notification } from 'antd'
import { auth } from 'src/config/firebase-client'
import { COOKIE_KEY, LOCAL_STORAGE_KEY, ROUTES } from 'src/constants/constants'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onIdTokenChanged,
  confirmPasswordReset,
  signInWithCustomToken,
} from 'firebase/auth'
import { get, isEmpty, size } from 'lodash'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { axios } from 'src/utils/axios'
import {
  dataFromToken,
  getStr,
  ITokenData,
  parseCookies,
  removeCookieUtil,
  setCookieUtil,
} from 'src/utils/utils'
import { removeTokenCookieHttp, setTokenCookieHttp } from './tokenCookies'
import {
  API_COACH_PROFILE,
  API_PLAYER_PROFILE,
} from 'src/constants/api.constants'

import { IPlayerProfile } from 'src/components/dashboard/dashboard-navbar'
import { wait } from 'src/utils/wait'

interface ValueType {
  currentUser?: any
  token?: string
  errorSignin?: string
  signin?: (email: string, password: string) => void
  signout?: () => void
  SignUpWithEmailAndPassword?: (email: string, password: string) => void
  resetPassword?: (email: string) => void
}

const AuthContext = React.createContext<any>(null)

export interface IUserRoles {
  roleId: string
  firstName: string
  lastName: string
  username: string
  faceImageUrl: string
  role: string
  position: string
}

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [token, setToken] = useState<string>('')
  const [errorSignin, setErrorSignin] = useState<string>('')
  const [checkEmail, setCheckEmail] = useState<boolean>(false)
  const [userRoles, setUserRoles] = useState<any>([])
  const [currentRoleName, setCurrentRoleName] = useState(
    parseCookies(null)[COOKIE_KEY.currentRoleName]
  )

  const currentRoleId = useMemo(() => {
    if (isEmpty(userRoles) || isEmpty(currentRoleName)) {
      return ''
    }

    const filter = userRoles.filter((role) => {
      return role.role === currentRoleName
    })
    if (isEmpty(filter)) {
      return ''
    }

    return get(filter, '[0].roleId') || ''

    return filter
  }, [userRoles, currentRoleName])

  useEffect(() => {
    console.log('aaa currentRoleId', currentRoleId)
    //@ts-ignore: Unreachable code error
    axios.defaults.headers.roleId = currentRoleId

    if (isEmpty(currentRoleId)) {
      removeCookieUtil(COOKIE_KEY.roleid)
    } else {
      setCookieUtil(COOKIE_KEY.roleid, currentRoleId)
    }
  }, [currentRoleId])

  useEffect(() => {
    if (isEmpty(currentRoleName)) {
      removeCookieUtil(COOKIE_KEY.currentRoleName)
    } else {
      //@ts-ignore: Unreachable code error
      setCookieUtil(COOKIE_KEY.currentRoleName, currentRoleName)
    }
  }, [currentRoleName])

  useEffect(() => {
    //@ts-ignore: Unreachable code error
    localStorage.setItem(LOCAL_STORAGE_KEY.userRoles, JSON.stringify(userRoles))
  }, [userRoles])

  useEffect(() => {
    //@ts-ignore: Unreachable code error
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }, [token])

  const infoActiveProfile = useMemo(() => {
    // inpormation about user: no matter they are player or coach
    if (isEmpty(userRoles)) {
      return {}
    }
    return userRoles.find((o) => o.role === currentRoleName) || {}
  }, [currentRoleName, userRoles])

  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user)
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          notification['error']({
            message: 'Your password invalid.',
            description: '',
          })
        } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
          notification['error']({
            message: 'Your account does not exist.',
            description: '',
          })
        } else {
          notification['error']({
            message: 'Login Fail. Please check your email or your password.',
            description: '',
          })
        }
      })
  }

  const SignInCustomToken = (token: string) => {
    signInWithCustomToken(auth, token)
      .then((userCredential) => {})
      .catch((error) => {
        notification['error']({
          message: 'Login failed',
          description: '',
        })
      })
  }

  const SignUpWithEmailAndPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        notification.open({
          message: '',
          description: 'Signup success. Please check your email.',
          style: {
            backgroundColor: '#09E099',
            color: '#FFFFFF',
          },
          duration: 3,
        })
      })
      .catch((error) => {
        notification.open({
          message: '',
          description: 'Email already in use.',
          style: {
            backgroundColor: '#ff4d4f',
            color: '#FFFFFF',
          },
          duration: 3,
        })
      })
  }

  const ForgotPassword = (oobCode: string, newPassword: string) => {
    confirmPasswordReset(auth, oobCode, newPassword)
      .then(() => {
        console.log('new password')
        window.location.href = '/signin'
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //logout
  const signout = () => {
    signOut(auth)
  }

  const ResetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setCheckEmail(true)
      })
      .catch((error) => {
        notification.open({
          message: '',
          description: 'Email not found',
          className: 'custom-class',
          style: {
            backgroundColor: '#ff4d4f',
            color: '#FFFFFF',
          },
          duration: 3,
        })
      })
  }

  const updateUserRoles = async (): Promise<{ error: boolean; data: any }> => {
    try {
      const resp = await axios.get('/users/user-roles')
      setUserRoles(resp.data)
      return { error: false, data: resp.data }
    } catch (error) {
      console.log('aaa updateUserRoles error', error)
      return { error: true, data: [] }
    }
  }

  useEffect(() => {
    let initT = +new Date()
    // console.log('aaa initT', initT)

    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      // console.log('aaa onIdTokenChanged', user)

      if (!user) {
        localStorage.clear()
        removeTokenCookieHttp()
        removeCookieUtil(COOKIE_KEY.roleid)
        removeCookieUtil(COOKIE_KEY.currentRoleName)
        setToken('')
        setCurrentUser(null)
        setUserRoles([])
        setCurrentRoleName('')
      } else {
        setCurrentUser(user)
        const token = await user.getIdToken()
        setToken(token)
        setTokenCookieHttp(token)
        // update axios token header
        axios.defaults.headers.common.Authorization = `Bearer ${token}`

        ///////////////////////////////// userRoles /////////////////////////////////
        let respUserRoles = null
        const resp = await axios.get('/users/user-roles')
        respUserRoles = resp

        if (isEmpty(respUserRoles.data)) {
          console.log('aaa wait1')
          await wait(1000)
          const resp2 = await axios.get('/users/user-roles')
          respUserRoles = resp2
        }

        if (isEmpty(respUserRoles.data)) {
          console.log('aaa wait2')
          await wait(1000)
          const resp3 = await axios.get('/users/user-roles')
          respUserRoles = resp3
        }

        // set current role name
        if (size(respUserRoles.data) === 1) {
          setCurrentRoleName(getStr(respUserRoles, 'data[0].role'))
        } else {
          let cookieCurrentRoleName =
            parseCookies(null)[COOKIE_KEY.currentRoleName]
          if (!cookieCurrentRoleName || cookieCurrentRoleName === 'undefined') {
            setCurrentRoleName('PLAYER')
          } else {
            //@ts-ignore: Unreachable code error
            setCurrentRoleName(cookieCurrentRoleName)
          }
        }

        setUserRoles(respUserRoles.data)
        if (!get(respUserRoles, 'data[0].role')) {
          router.push(ROUTES.SIGNUP_FORM)
        }
        ///////////////////////////////// userRoles /////////////////////////////////
      }
      const doneT = +new Date()
      // console.log('aaa doneT', doneT)
      // console.log('aaa doneT - initT', doneT - initT)
      setTimeout(() => {
        setInitialized(true)
      }, 50)
    })

    return () => {
      unsubscribeToken()
    }
  }, [])

  // force refresh the token every 4 minutes
  useEffect(() => {
    if (!get(currentUser, 'uid')) {
      return
    }
    const handle = setInterval(async () => {
      const token = await currentUser.getIdToken(true)
      setTokenCookieHttp(token)
      // update axios token header
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      setToken(token)
    }, 4 * 60 * 1000)
    return () => clearInterval(handle)
  }, [get(currentUser, 'uid')])

  const value: any = {
    currentUser,
    token,
    errorSignin,
    checkEmail,
    setCheckEmail,
    signin,
    signout,
    SignUpWithEmailAndPassword,
    SignInCustomToken,
    ResetPassword,
    currentRoleId,
    currentRoleName,
    setCurrentRoleName,
    userRoles,
    initialized,
    infoActiveProfile, // info about active profile, no matter player or coach
    authenticated: !!currentUser,
    updateUserRoles,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Generated by https://quicktype.io
export const AuthConsumer = AuthContext.Consumer
