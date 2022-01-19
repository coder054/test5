// import { auth } from 'config/firebase-client'
import { auth } from 'config'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
  }

  const signup = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
  }

  const signout = () => {
    signout
  }

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      setCurrentUser(authUser)
      setLoading(false)
    })
  }, [])

  const value: any = {
    currentUser,
    signin,
    signout,
    signup,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
