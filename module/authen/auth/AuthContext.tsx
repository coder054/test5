// import { auth } from 'config/firebase-client'
import { notification } from 'antd'
import { auth } from 'config'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onIdTokenChanged,
  confirmPasswordReset,
} from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { axios } from 'utils/axios'

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

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [errorSignin, setErrorSignin] = useState<string>('')
  const [checkEmail, setCheckEmail] = useState<boolean>(false)

  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user)
        window.location.href = '/feed'
      })
      .catch((error) => {
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
        window.location.href = '/signin'
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
    window.location.href = '/signin'
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

  const setTokenCookie = (token: string) => {
    fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
  }

  const removeTokenCookie = () => {
    fetch('/api/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
  }

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

    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      console.log('aaa onIdTokenChanged', user)

      if (!user) {
        removeTokenCookie()
        setToken('')
        setCurrentUser(null)
        setLoading(false)
      } else {
        setLoading(true)
        const token = await user.getIdToken()

        // update axios config
        axios.defaults.headers.common.Authorization = `Bearer ${token}`

        setToken(token)
        setTokenCookie(token)
        setCurrentUser(user)
        setLoading(false)
      }
    })

    return () => {
      unsubscribeToken()
    }
  }, [])

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token: string = await user.getIdToken()
        setToken(token)
      }
    })
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
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}