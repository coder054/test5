// import { auth } from 'src/config/firebase-client'
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
import toast from 'react-hot-toast'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { signingOutAtom } from 'src/atoms/UIAtoms'
import { auth } from 'src/config/firebase-client'
import { COOKIE_KEY, LOCAL_STORAGE_KEY } from 'src/constants/constants'
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

  const signin = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user)
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          toast.error('The password you entered is incorrect.')
        } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
          toast.error('Your account does not exist.')
        } else {
          toast.error('Login Fail. Please check your email or your password.')
        }
      })
  }

  const SignInCustomToken = async (token: string) => {
    return await signInWithCustomToken(auth, token)
  }

  const SignUpWithEmailAndPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Signup success. Please check your email.')
      })
      .catch(() => {
        toast.error('Email already in use.')
      })
  }

  const ForgotPassword = (oobCode: string, newPassword: string) => {
    confirmPasswordReset(auth, oobCode, newPassword)
      .then(() => {
        window.location.href = '/sign-in'
      })
      .catch(() => {})
  }

  //logout
  const signout = () => {
    signOut(auth)
      .then(() => {
        setSigningOut(true)
      })
      .catch((error) => {
        toast.error('Something went wrong')
      })
  }

  const ResetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setCheckEmail(true)
      })
      .catch(() => {
        toast.error('Email not found')
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
              setCurrentRoleName(cookieCurrentRoleName)
            }
          }
        }

        setUserRoles(respUserRoles.data)
      }
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
