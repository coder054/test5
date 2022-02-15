// import { auth } from 'config/firebase-client'
import { notification } from 'antd'
import { auth } from 'config'
import { LOCAL_STORAGE_KEY } from 'constants/constants'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onIdTokenChanged,
  confirmPasswordReset,
} from 'firebase/auth'
import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { axios } from 'utils/axios'
import { dataFromToken, ITokenData } from 'utils/utils'
import { removeTokenCookie, setTokenCookie } from './tokenCookies'

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
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [tokenData, setTokenData] = useState<any>(dataFromToken(cookies.token))
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [errorSignin, setErrorSignin] = useState<string>('')
  const [checkEmail, setCheckEmail] = useState<boolean>(false)
  const [userRoles, setUserRoles] = useState<any>(
    typeof window !== 'undefined'
      ? //@ts-ignore: Unreachable code error
        JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY.userRoles)) ||
          []
      : []
  )
  const [currentRoleName, setCurrentRoleName] = useState<'COACH' | 'PLAYER'>(
    'PLAYER'
  )

  const currentRoleId = useMemo(() => {
    if (isEmpty(userRoles)) return ''
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
    console.log('aaa2 userRoles: ', userRoles)
  }, [userRoles])
  useEffect(() => {
    console.log('aaa2 currentRoleId: ', currentRoleId)
  }, [currentRoleId])

  useEffect(() => {
    if (!currentRoleId) {
      return
    }
    //@ts-ignore: Unreachable code error
    axios.defaults.headers.roleId = currentRoleId
    localStorage.setItem(LOCAL_STORAGE_KEY.currentRoleId, currentRoleId)
  }, [currentRoleId])

  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user)
        window.location.href = '/feed'
      })
      .catch((error) => {
        console.log('err', error.message)
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          notification.open({
            message: '',
            description: 'Your password invalid.',
            className: 'custom-class',
            style: {
              backgroundColor: '#ff4d4f',
              color: '#FFFFFF',
            },
            duration: 3,
          })
        } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
          notification.open({
            message: '',
            description: 'Your account does not exist.',
            className: 'custom-class',
            style: {
              backgroundColor: '#ff4d4f',
              color: '#FFFFFF',
            },
            duration: 3,
          })
        } else {
          notification.open({
            message: '',
            description:
              'Login Fail. Please check your email or your password.',
            className: 'custom-class',
            style: {
              backgroundColor: '#ff4d4f',
              color: '#FFFFFF',
            },
            duration: 3,
          })
        }
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
        // window.location.href = '/signin'
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
    localStorage.removeItem(LOCAL_STORAGE_KEY.userRoles)
    localStorage.removeItem(LOCAL_STORAGE_KEY.currentRoleId)
    // window.location.href = '/signin'
    setTimeout(() => {
      router.push('/signin')
    }, 1000)
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

  // const setTokenCookie = (token: string) => {
  //   fetch('/api/login', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ token }),
  //   })
  // }

  // const removeTokenCookie = () => {
  //   fetch('/api/logout', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({}),
  //   })
  // }

  useEffect(() => {
    // no need
    // const unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
    //   console.log('aaa onAuthStateChanged', authUser)

    //   if (!authUser) {
    //     setCurrentUser(null)
    //     setLoading(false)
    //     return
    //   }

    //   setLoading(true)
    //   setCurrentUser(authUser)
    //   setLoading(false)
    // })

    // if (!!cookies.token) {
    //   setTokenData(dataFromToken(cookies.token))
    // }

    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      // console.log('aaa onIdTokenChanged', user)

      if (!user) {
        removeTokenCookie()
        setToken('')
        setCurrentUser(null)
        localStorage.removeItem(LOCAL_STORAGE_KEY.currentRoleId)
        localStorage.removeItem(LOCAL_STORAGE_KEY.userRoles)
        setLoading(false)
      } else {
        setLoading(true)
        const token = await user.getIdToken()

        setTokenCookie(token)
        // update axios token header
        axios.defaults.headers.common.Authorization = `Bearer ${token}`

        const userRoles = localStorage.getItem(LOCAL_STORAGE_KEY.userRoles)
        if (!userRoles) {
          const resp = await axios.get('/users/user-roles')
          localStorage.setItem(
            LOCAL_STORAGE_KEY.userRoles,
            JSON.stringify(resp.data)
          )
          setUserRoles(resp.data)
          const roleId = get(resp, 'data[0].roleId')
          // update axios token header
          //@ts-ignore: Unreachable code error
          axios.defaults.headers.roleId = roleId
        }

        setToken(token)
        setCurrentUser(user)
        setLoading(false)
      }
    })

    return () => {
      unsubscribeToken()
    }
  }, [])

  const value: any = {
    currentUser,
    token,
    errorSignin,
    checkEmail,
    setCheckEmail,
    signin,
    signout,
    SignUpWithEmailAndPassword,
    ResetPassword,
    currentRoleId,
    userRoles,
    tokenData,
  }

  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  )
}

// Generated by https://quicktype.io
