// import { auth } from 'src/config/firebase-client'
import { notification } from 'antd'
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { useAtom } from 'jotai'
import { get, isEmpty, size } from 'lodash'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { signingOutAtom } from 'src/atoms/UIAtoms'
import { auth, initFirebaseFCM } from 'src/config/firebase-client'
import { COOKIE_KEY, LOCAL_STORAGE_KEY, ROUTES } from 'src/constants/constants'
import { axios } from 'src/utils/axios'
import {
  getStr,
  parseCookies,
  removeCookieUtil,
  setCookieUtil,
} from 'src/utils/utils'
import { removeTokenCookieHttp, setTokenCookieHttp } from './tokenCookies'

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
  const [signingOut, setSigningOut] = useAtom(signingOutAtom)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const router = useRouter()
  const [_, setSettings] = useAtom(settingsAtom)
  const [initialized, setInitialized] = useState(false)
  const [updatingAuthInfo, setUpdatingAuthInfo] = useState(true)
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
    //@ts-ignore: Unreachable code error
    axios.defaults.headers.roleId = currentRoleId

    if (isEmpty(currentRoleId)) {
      removeCookieUtil(COOKIE_KEY.roleid)
    } else {
      setCookieUtil(COOKIE_KEY.roleid, currentRoleId)
    }
  }, [currentRoleId])

  useEffect(() => {
    if (!!currentRoleId && !!token) {
      // initFirebaseFCM(token, currentRoleId)
    }
  }, [currentRoleId, token])

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
        window.location.href = '/signin'
      })
      .catch((error) => {})
  }

  //logout
  const signout = () => {
    signOut(auth)
      .then(() => {
        setSigningOut(true)
      })
      .catch((error) => {})
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
      return { error: true, data: [] }
    }
  }

  useEffect(() => {
    let initT = +new Date()
    // console.log('aaa initT', initT)

    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      setUpdatingAuthInfo(true)
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
        setSigningOut(false)
        setCurrentUser(user)
        const token = await user.getIdToken()
        setToken(token)
        setTokenCookieHttp(token)
        // update axios token header
        axios.defaults.headers.common.Authorization = `Bearer ${token}`

        ///////////////////////////////// userRoles /////////////////////////////////
        const respUserRoles = await axios.get('/users/user-roles')

        // set current role name
        if (isEmpty(respUserRoles.data)) {
        } else {
          if (size(respUserRoles.data) === 1) {
            setCurrentRoleName(getStr(respUserRoles, 'data[0].role'))
          } else {
            let cookieCurrentRoleName =
              parseCookies(null)[COOKIE_KEY.currentRoleName]
            if (
              !cookieCurrentRoleName ||
              cookieCurrentRoleName === 'undefined'
            ) {
              setCurrentRoleName('PLAYER')
            } else {
              //@ts-ignore: Unreachable code error
              setCurrentRoleName(cookieCurrentRoleName)
            }
          }
        }

        setUserRoles(respUserRoles.data)
        ///////////////////////////////// userRoles /////////////////////////////////
      }
      // const doneT = +new Date()
      // console.log('aaa doneT', doneT)
      // console.log('aaa doneT - initT', doneT - initT)
      setTimeout(() => {
        setUpdatingAuthInfo(false)
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
    const handle = setInterval(() => {
      currentUser.getIdToken(true)
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
    updatingAuthInfo,
    infoActiveProfile, // info about active profile, no matter player or coach
    authenticated: !!currentUser,
    updateUserRoles,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Generated by https://quicktype.io
export const AuthConsumer = AuthContext.Consumer