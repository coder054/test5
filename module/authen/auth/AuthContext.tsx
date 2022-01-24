// import { auth } from 'config/firebase-client'
import { auth } from 'config'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
  signOut,
  onIdTokenChanged,
} from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'

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

  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user)
      })
      .catch((error) => {
        // console.log('error', error.code)
        setErrorSignin(error.code)
      })
  }

  const SignUpWithEmailAndPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        debugger
      })
      .catch((error) => {
        console.log('err', error)
      })
  }

  const signout = () => {
    signOut(auth)
    window.location.href = '/signin'
  }

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    return onAuthStateChanged(auth, (authUser) => {
      setCurrentUser(authUser)
      setLoading(false)
    })
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
    signin,
    signout,
    SignUpWithEmailAndPassword,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
